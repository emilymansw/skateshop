import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FormContainer } from './styles';
import { Dropdown } from '../Dropdown';
import { ImageUploader } from '../ImageUploader';
import { VariantInfo } from '../VariantInfo';
import { Button, LoadingSpinner } from '../../../../../../shared/UI/SharedUI';
import {
  useGetCategories,
  useGetBrands,
  useGetOptionFamilies,
} from '../../../../../../../api/APIService';
import {
  ICategoryData,
  IOptionFamilyData,
} from '../../../../../../../types/product';
import { ProductFormPropsType } from '../../../../../../../types/props';
import { IBrandData } from '../../../../../../../types/brand';
import { OptionSelection } from '../OptionSelection';
import { CreationModal } from '../../../../../CreateOption/components';
import { optionValuesCombinationSetter } from '../utils';

export const ProductForm = (props: ProductFormPropsType) => {
  const {
    mode,
    variants,
    setVariants,
    category,
    setCategory,
    brand,
    setBrand,
    options,
    setOptions,
    optionValues,
    setOptionValues,
    optionFamilies,
    setOptionFamilies,
    name,
    setName,
    description,
    setDescription,
    imagesUploaded,
    setImagesUploaded,
    checkValidAndFetch,
    data,
    error,
  } = props;

  const [existingCategories, setExistingCategories] = useState<ICategoryData[]>(
    []
  );
  const [existingBrands, setExistingBrands] = useState<IBrandData[]>([]);
  const [existingOptionFamilies, setExistingOptionFamilies] = useState<
    IOptionFamilyData[]
  >([]);
  const [createVariants, setCreateVariants] = useState(false);
  const [optionCount, setOptionCount] = useState<number>(1);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [isOpen, setIsOpen] = useState(mode === 'create');
  const {
    createVariantsState,
    optionCountState,
    brandState,
    categoryState,
    variantsHistory,
    optionsHistory,
  } = props;

  const {
    loading: catsLoading,
    error: catsError,
    data: categoriesData,
  } = useGetCategories();

  const {
    data: brandsData,
    error: brandsError,
    loading: brandsLoading,
  } = useGetBrands();

  const {
    fetchData: fetchOptionFamily,
    data: optionFamiliesData,
    error: optionFamilyError,
    loading: optionFamiliesLoading,
  } = useGetOptionFamilies();

  useEffect(() => {
    if (categoriesData) {
      setExistingCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (brandsData) {
      setExistingBrands(brandsData);
    }
  }, [brandsData]);

  useEffect(() => {
    if (optionFamiliesData) {
      setExistingOptionFamilies(
        optionFamiliesData.filter(
          (optionFamilyItem) => optionFamilyItem.name !== 'default'
        )
      );
    }
  }, [optionFamiliesData]);

  useEffect(() => {
    if (mode === 'edit') {
      if (existingCategories && existingBrands && optionCountState) {
        setCategory(
          existingCategories.filter(
            (categoryVariable) => categoryVariable.name === categoryState
          )[0]
        );
        setBrand(
          existingBrands.filter(
            (brandVariable) => brandVariable.slug === brandState
          )[0]
        );
        setOptionCount(optionCountState);
      }
      if (createVariantsState !== undefined) {
        setCreateVariants(createVariantsState);
      }
    }
  }, [existingCategories, existingBrands]);

  useEffect(() => {
    if (mode === 'create' && !createVariants) {
      setVariants([
        {
          stock: 0,
          weight: 0,
          price: 0,
          compareAtPrice: 0,
          optionValues: ['default'],
          colorName: '',
        },
      ]);
      setOptions([{ optionFamily: 'default', optionValues: ['default'] }]);
    }
  }, [createVariants]);

  useEffect(() => {
    if (mode === 'create' && createVariants) {
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
      const variantsArray = Array.from(
        { length: optionValuesCombinationCount },
        (v, i) => ({
          stock: 0,
          weight: 0,
          price: 0,
          compareAtPrice: 0,
          optionValues: optionValuesCombinations[i],
          colorName: '',
        })
      );
      setVariants(variantsArray);
    }
  }, [optionValues, optionFamilies]);

  const handleVariantPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const variantsCopy = [...variants];
    const variantToUpdate = {
      ...variants[variantIndex],
      price: Number(e.target.value),
    };
    variantsCopy[variantIndex] = variantToUpdate;
    setVariants(variantsCopy);
  };

  const handleVariantCompareAtPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const variantsCopy = [...variants];
    const variantToUpdate = {
      ...variants[variantIndex],
      compareAtPrice: Number(e.target.value),
    };
    variantsCopy[variantIndex] = variantToUpdate;
    setVariants(variantsCopy);
  };

  const handleVariantStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const variantsCopy = [...variants];
    const variantToUpdate = {
      ...variants[variantIndex],
      stock: Number(e.target.value),
    };
    variantsCopy[variantIndex] = variantToUpdate;
    setVariants(variantsCopy);
  };

  const handleVariantWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const variantsCopy = [...variants];
    const variantToUpdate = {
      ...variants[variantIndex],
      weight: Number(e.target.value),
    };
    variantsCopy[variantIndex] = variantToUpdate;
    setVariants(variantsCopy);
  };

  const handleVariantColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const variantsCopy = [...variants];
    const variantToUpdate = {
      ...variants[variantIndex],
      colorName: e.target.value.trim(),
    };
    variantsCopy[variantIndex] = variantToUpdate;
    setVariants(variantsCopy);
  };

  const clearVariantsAndOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateVariants(e.target.value === 'true');
    setOptions([{ optionFamily: 'default', optionValues: ['default'] }]);
    setVariants([
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
    setOptionValues([]);
    setOptionFamilies([]);
  };

  if (
    existingBrands.length === 0 ||
    existingCategories.length === 0 ||
    (mode === 'edit' && !(category && brand))
  )
    return <LoadingSpinner />;

  return (
    <FormContainer>
      <Link to="/admin/products"> ← Back to Product List</Link>
      <h2>{mode === 'create' ? <>Create Product</> : <>Edit Product</>}</h2>
      {data && (
        <h1>
          Successfully {mode === 'create' ? <>created </> : <>edited </>}
          Product #{data.id}
        </h1>
      )}
      {error && <h1>Something went wrong {error.message}</h1>}
      <div>
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <span>Description</span>
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div>
        Images
        <ImageUploader
          imagesUploaded={imagesUploaded}
          setImagesUploaded={setImagesUploaded}
        />
      </div>
      <div>
        <span>Category</span>
        <Dropdown
          items={existingCategories}
          setSelectedItem={setCategory}
          type="category"
          selectedItem={category}
        />
      </div>
      <div>
        <span>Brand</span>
        <Dropdown
          items={existingBrands}
          setSelectedItem={setBrand}
          type="brand"
          selectedItem={brand}
        />
      </div>
      <span>Create Variant?</span>
      <div>
        <input
          type="radio"
          value="false"
          name="hasVariant"
          checked={!createVariants}
          onChange={(e) => clearVariantsAndOptions(e)}
        />
        No
        <input
          type="radio"
          value="true"
          name="hasVariant"
          checked={createVariants}
          onChange={(e) => {
            setCreateVariants(e.target.value === 'true');
          }}
        />{' '}
        Yes
      </div>
      {!createVariants ? (
        <VariantInfo
          variants={variants}
          handleVariantPriceChange={handleVariantPriceChange}
          handleVariantCompareAtPriceChange={handleVariantCompareAtPriceChange}
          handleVariantStockChange={handleVariantStockChange}
          handleVariantWeightChange={handleVariantWeightChange}
          variantIndex={0}
          handleVariantColorChange={handleVariantColorChange}
        />
      ) : (
        existingOptionFamilies.length > 0 && (
          <>
            {mode === 'edit' && (
              <>
                <p>Current Options:</p>
                {optionsHistory &&
                  optionsHistory.map((option) => (
                    <p>
                      <span>{option.optionFamily}:</span>
                      {option.optionValues.map((optionValue, i) => (
                        <>
                          {i !== 0 && <span> | </span>}
                          <span> {optionValue} </span>
                        </>
                      ))}
                    </p>
                  ))}

                <p>Current Variants:</p>
                {variantsHistory &&
                  optionsHistory &&
                  optionsHistory[0].optionFamily !== 'default' &&
                  variantsHistory.map((variant) => (
                    <p>
                      {variant.optionValues.map((optionValue, i) => (
                        <>
                          {i !== 0 && <span> | </span>}
                          <span> {optionValue} </span>
                        </>
                      ))}
                      - Price: {variant.price}
                      <span> / </span>
                      Compare at Price: {variant.compareAtPrice}
                      <span> / </span>
                      Stock: {variant.stock}
                      <span> / </span>
                      Weight: {variant.weight}
                      <span> / </span>
                      ColorName: {variant.colorName}
                    </p>
                  ))}
                <Button
                  type="submit"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <span>Update Options and Variants</span>
                  <AiOutlineDown />
                </Button>
              </>
            )}
            {isOpen && (
              <div>
                {Array.from({ length: optionCount }, (_, index) => (
                  <OptionSelection
                    existingOptionFamilies={existingOptionFamilies}
                    optionFamily={optionFamilies}
                    setOptionFamily={setOptionFamilies}
                    optionValues={optionValues}
                    setOptionValues={setOptionValues}
                    optionsIndex={index}
                    options={options}
                    setOptions={setOptions}
                    optionCount={optionCount}
                    setOptionCount={setOptionCount}
                  />
                ))}
                <Button
                  type="submit"
                  onClick={() => {
                    setOptionCount(optionCount + 1);
                  }}
                >
                  Add new option to product
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setModalDisplay(true);
                  }}
                >
                  Create new option
                </Button>
                <CreationModal
                  display={modalDisplay}
                  setDisplay={setModalDisplay}
                  refetchOptionFamily={fetchOptionFamily}
                />
                <br />
                {variants.map((_, index) => (
                  <VariantInfo
                    key={index}
                    variants={variants}
                    handleVariantPriceChange={handleVariantPriceChange}
                    handleVariantCompareAtPriceChange={
                      handleVariantCompareAtPriceChange
                    }
                    handleVariantStockChange={handleVariantStockChange}
                    handleVariantWeightChange={handleVariantWeightChange}
                    variantIndex={index}
                    handleVariantColorChange={handleVariantColorChange}
                  />
                ))}
              </div>
            )}
          </>
        )
      )}
      <Button
        type="submit"
        onClick={checkValidAndFetch}
        disabled={data !== undefined}
      >
        {mode === 'create' ? <>Add new product</> : <>Edit Product</>}
      </Button>
    </FormContainer>
  );
};
