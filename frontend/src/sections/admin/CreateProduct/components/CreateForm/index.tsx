import { useEffect, useState } from 'react';
import { usePostNewProduct } from '../../../../../api/APIService';
import { IBrandData } from '../../../../../types/brand';
import {
  ICategoryData,
  IOptionFamilyData,
  IImagesUploadedData,
} from '../../../../../types/product';
import { hasNullProperty } from '../../../../../utils/helperFunctions';
import { CSS_COLOR_NAMES } from '../../../../../utils/colorList';
import { ProductForm } from '../../../shared/components/ProductForm/components/Form';

export const CreateForm = () => {
  const [category, setCategory] = useState<ICategoryData>();
  const [brand, setBrand] = useState<IBrandData>();
  const [options, setOptions] = useState([
    { optionFamily: 'default', optionValues: ['default'] },
  ]);
  const [optionFamilies, setOptionFamilies] = useState<IOptionFamilyData[]>([]);
  const [optionValues, setOptionValues] = useState<string[][]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<IImagesUploadedData[]>(
    []
  );
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [variants, setVariants] = useState([
    {
      stock: 0,
      weight: 0,
      price: 0,
      compareAtPrice: 0,
      optionValues: ['default'],
      colorName: '',
    },
  ]);
  const [postRequest, setPostRequest] = useState({
    name: '',
    brandName: '',
    categoryName: '',
    description: '',
    images: [] as IImagesUploadedData[],
    options,
    variants,
  });

  const {
    fetchData: postNewProduct,
    loading,
    data: newProductData,
    error,
  } = usePostNewProduct();

  useEffect(() => {
    const postRequestUpdate = { ...postRequest };
    postRequestUpdate.name = name.trim();
    postRequestUpdate.brandName = brand?.name || '';
    postRequestUpdate.categoryName = category?.name || '';
    postRequestUpdate.description = description.trim();
    postRequestUpdate.images = imagesUploaded;
    postRequestUpdate.options = options;
    postRequestUpdate.variants = variants;
    setPostRequest(postRequestUpdate);
  }, [name, brand, category, description, imagesUploaded, options, variants]);

  const checkValidAndPost = () => {
    let valid = true;
    if (hasNullProperty(postRequest)) {
      valid = false;
    }
    if (variants.length === 1 && variants[0].optionValues[0] !== 'default') {
      valid = false;
    }
    if (imagesUploaded.length === 0) {
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
      postNewProduct('', {}, postRequest);
    } else {
      alert(
        "1. Need to fill all fields except description\n2. Price fields cannot be equal or small than 0\n3. Choose 'NO' for 'Create variants?' if the product only has one variant\n4. Use only CSS color name for variant color field"
      );
    }
  };

  return (
    <ProductForm
      mode="create"
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
      data={newProductData}
      error={error}
    />
  );
};
