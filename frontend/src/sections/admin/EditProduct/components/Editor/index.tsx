/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePutProduct } from '../../../../../api/APIService';
import { optionValuesCombinationSetter } from '../../../shared/components/ProductForm/components/utils';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { IBrandData } from '../../../../../types/brand';
import {
  ICategoryData,
  IOptionFamilyData,
  IImagesUploadedData,
  IProductData,
  IVariantData,
  ICreateOptionData,
} from '../../../../../types/product';
import { hasNullProperty } from '../../../../../utils/helperFunctions';
import { CSS_COLOR_NAMES } from '../../../../../utils/colorList';
import { ProductForm } from '../../../shared/components/ProductForm';

interface VariantType {
  id: number | undefined;
  stock: number;
  weight: number;
  price: number;
  compareAtPrice: number;
  optionValues: string[];
  colorName: string;
}

export const Editor = ({ product }: { product: IProductData | undefined }) => {
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  const [category, setCategory] = useState<ICategoryData>();
  const [brand, setBrand] = useState<IBrandData>();
  const [optionCount, setOptionCount] = useState<number>(1);
  const [options, setOptions] = useState([
    { optionFamily: 'default', optionValues: ['default'] },
  ]);
  const [optionsHistory, setOptionsHistory] = useState<
    ICreateOptionData[] | undefined
  >();
  const [optionFamilies, setOptionFamilies] = useState<IOptionFamilyData[]>([]);
  const [optionValues, setOptionValues] = useState<string[][]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<IImagesUploadedData[]>(
    []
  );
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [createVariants, setCreateVariants] = useState(false);
  const [variants, setVariants] = useState<IVariantData[]>([
    {
      id: 0,
      stock: 0,
      weight: 0,
      price: 0,
      compareAtPrice: 0,
      optionValues: ['default'],
      colorName: '',
    },
  ]);

  const [variantsHistory, setVariantsHistory] = useState<
    IVariantData[] | undefined
  >();

  const [postRequest, setPostRequest] = useState({
    id: 0,
    name: '',
    brandName: '',
    categoryName: '',
    description: '',
    images: [] as IImagesUploadedData[],
    options,
    variants,
  });
  const { slug } = useParams();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImagesUploaded(product.images);
      setVariants(product.variants);
      setVariantsHistory(product.variants);
      setOptionFamilies(product.options);
      if (product.variants[0].optionValues[0] !== 'default') {
        setCreateVariants(true);
        setOptionCount(product.options.length);
        const currentOption = new Array(product.options.length);
        const currentOptionvalues: string[][] = [];
        product.options.forEach((option, index) => {
          currentOption[index] = {
            optionFamily: option.name,
            optionValues: option.optionValues,
          };
          currentOptionvalues.push(option.optionValues);
        });
        setOptions(currentOption);
        setOptionsHistory(currentOption);
        setOptionValues(currentOptionvalues);
      }
      setIsDetailLoaded(true);
    }
  }, [product]);

  const {
    fetchData: putProduct,
    loading,
    data: putProductData,
    error,
  } = usePutProduct(slug as string);

  useEffect(() => {
    const postRequestUpdate = { ...postRequest };
    if (product) postRequestUpdate.id = product.id;
    postRequestUpdate.name = name;
    postRequestUpdate.brandName = brand?.name || '';
    postRequestUpdate.categoryName = category?.name || '';
    postRequestUpdate.description = description;
    postRequestUpdate.images = imagesUploaded;
    postRequestUpdate.options = options;
    postRequestUpdate.variants = variants;
    setPostRequest(postRequestUpdate);
  }, [
    name,
    brand,
    category,
    description,
    imagesUploaded,
    options,
    variants,
    product,
  ]);

  useEffect(() => {
    if (
      createVariants &&
      variants &&
      product &&
      optionFamilies !== product.options
    ) {
      let optionValuesCombinationCount = 1;
      let optionValuesCombinations: string[][] = [];
      const optionsCopy = [...options];
      if (optionValues.length > 1 || optionValues[0]?.length > 1) {
        optionValues.forEach((optionValue: string[], index: number) => {
          optionValuesCombinationCount *= optionValue.length;
          const option = {
            ...optionsCopy[index],
            optionFamily: optionFamilies[index].name,
            optionValues: optionValue,
          };
          optionsCopy[index] = option;
        });
        setOptions(optionsCopy);
        optionValuesCombinations = optionValuesCombinationSetter(optionValues);
      }
      const variantsArray: VariantType[] = Array.from(
        { length: optionValuesCombinationCount },
        (v, i) => ({
          id: undefined,
          stock: 0,
          weight: 0,
          price: 0,
          compareAtPrice: 0,
          optionValues: optionValuesCombinations[i],
          colorName: '',
        })
      );
      variants.forEach((v, i) => {
        for (let oi = 0; oi < optionValuesCombinations.length; oi++) {
          if (
            variants[i].optionValues?.every((vov) =>
              optionValuesCombinations[oi].includes(vov)
            )
          ) {
            variants[i].optionValues = optionValuesCombinations[oi];
            variantsArray[oi] = variants[i] as unknown as VariantType;
            break;
          }
        }
      });

      setVariants(variantsArray);
    }
  }, [optionValues, optionFamilies]);

  const checkValidAndPost = () => {
    let valid = true;
    if (hasNullProperty(postRequest)) {
      valid = false;
    }
    if (imagesUploaded.length === 0) {
      valid = false;
    }
    if (variants.length === 1 && variants[0].optionValues[0] !== 'default') {
      valid = false;
    }
    variants.forEach((variant) => {
      if (
        variant.price <= 0 ||
        variant.compareAtPrice < 0 ||
        hasNullProperty(variant) ||
        !CSS_COLOR_NAMES.includes(variant.colorName.toLowerCase())
      ) {
        valid = false;
      }
    });
    if (valid) {
      putProduct(slug as string, {}, postRequest);
    } else {
      alert(
        "1. Need to fill all fields except description\n2. Price field cannot be equal or small than 0\n3. Choose 'NO' for 'Create variants?' if the product only has one variant"
      );
    }
  };

  if (!product) return <LoadingSpinner />;

  return (
    <ProductForm
      mode="edit"
      variants={variants}
      setVariants={setVariants}
      category={category}
      setCategory={setCategory}
      brand={brand}
      setBrand={setBrand}
      options={options}
      setOptions={setOptions}
      optionValues={optionValues}
      setOptionValues={setOptionValues}
      optionFamilies={optionFamilies}
      setOptionFamilies={setOptionFamilies}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      imagesUploaded={imagesUploaded}
      setImagesUploaded={setImagesUploaded}
      checkValidAndFetch={checkValidAndPost}
      data={putProductData}
      optionCountState={optionCount}
      createVariantsState={createVariants}
      brandState={product.brandSlug}
      categoryState={product.categoryName}
      variantsHistory={variantsHistory}
      optionsHistory={optionsHistory}
      error={error}
    />
  );
};
