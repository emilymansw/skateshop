import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetProduct } from '../../../../../api/APIService';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import {
  IProductData,
  IVariantData,
  IOptionData,
  IImageData,
  IPartsInfoData,
} from '../../../../../types/product';

export const ModalContainer = styled.div`
  display: none;
  position: fixed;
  z-index: 999;
  width: 80%;
  height: 80%;
  overflow: auto;
  border-radius: 1rem;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  left: 10%;
  top: 10%;
  &.show {
    display: block;
  }
`;

export const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: 80%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductDescription = styled.div`
  width: 650px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const MainImageWrapper = styled.div`
  width: 40vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 70vw;
    height: 70vw;
  }
  img {
    width: 60%;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin: auto;
  }
`;

const ThumbWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  border: solid LightGray;
  margin: 5px 5px;
  cursor: pointer;
  :hover {
    border: solid DimGray;
  }
  img {
    width: 50px;
    height: auto;
    object-fit: contain;
  }
`;

const ThumbContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagesBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const AddToCartButton = styled.button`
  background: none;
  border: 1px solid #515151;
  padding: 8px 0px;
  margin-bottom: 30px;
  color: #515151;
  text-transform: uppercase;
  width: 170px;
  height: 53px;
  margin-right: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.9em;

  &:hover {
    border: 1px solid #a9a9a9;
    color: #a9a9a9;
    cursor: pointer;
  }
`;

const VariantBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid #515151;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  margin: 0px 5px 0px 0px;
  font-weight: bold;
  display: inline-block;
`;

const SelectedVariantBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid #a9a9a9;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  margin: 0px 5px 0px 0px;
  font-weight: bold;
  display: inline-block;
`;

export const ProductModal = ({
  slug,
  display,
  setDisplay,
  parts,
  setParts,
}: {
  slug: string;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  parts: IPartsInfoData;
  setParts: React.Dispatch<React.SetStateAction<IPartsInfoData>>;
}) => {
  const { fetchData, data: productData, error, loading } = useGetProduct(slug);
  const [product, setProduct] = useState<IProductData | undefined>();
  const [variants, setVariants] = useState<IVariantData[] | undefined>();
  const [selectedVariant, setSelectedVariant] = useState<
    IVariantData | undefined
  >();
  const [options, setOptions] = useState<IOptionData[] | undefined>();
  const [imagesThumbs, setImagesThumbs] = useState<IImageData[] | undefined>();
  const [mainImage, setMainImage] = useState<IImageData | undefined>();
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (productData) {
      setProduct(productData);
      setVariants(productData.variants);
      setOptions(productData.options);
      if (variants) {
        setSelectedVariant(variants[0]);
      }
      setImagesThumbs(productData.images);
      setMainImage(productData.images[0]);
    }
  }, [loading]);

  useEffect(() => {
    if (variants) setSelectedVariant(variants[0]);
  }, [variants]);

  useEffect(() => {
    if (options) {
      let initialSelectedOptionValues = {};
      options.forEach(({ name, optionValues }) => {
        initialSelectedOptionValues = {
          ...initialSelectedOptionValues,
          [name]: optionValues[0],
        };
      });
      setSelectedOptionValues(initialSelectedOptionValues);
    }
  }, [options]);

  const selectVariant = (optionValueName: string, optionName: string) => {
    const selectedOptionValuesCopy = { ...selectedOptionValues };
    selectedOptionValuesCopy[optionName] = optionValueName;
    setSelectedOptionValues(selectedOptionValuesCopy);
    variants?.forEach((variant) => {
      const variantOptions = variant.optionValues;
      const selectedOptions = Object.values(selectedOptionValuesCopy);
      if (
        variantOptions.length === selectedOptions.length &&
        selectedOptions.every(
          (selectedOption, index: number) =>
            selectedOption === variantOptions[index]
        )
      ) {
        setSelectedVariant(variant);
      }
    });
  };

  const addToCart = (categoryName: string) => {
    const updatedParts = { ...parts };
    if (categoryName === 'grip tape' && selectedVariant && product) {
      updatedParts.gripTape = {
        variantId: selectedVariant.id,
        variantOptionValues: selectedVariant.optionValues,
        productName: product.name,
        image: product.images[0].imageUrl,
        cloudinaryId: product.images[0].cloudinaryId,
        price: selectedVariant.price,
        color: selectedVariant.colorName,
        quantity: 1,
      };
    } else if (categoryName === 'truck' && selectedVariant && product) {
      updatedParts.truck = {
        variantId: selectedVariant.id,
        variantOptionValues: selectedVariant.optionValues,
        productName: product.name,
        image: product.images[0].imageUrl,
        cloudinaryId: product.images[0].cloudinaryId,
        price: selectedVariant.price,
        color: selectedVariant.colorName,
        quantity: 2,
      };
    } else if (selectedVariant && product) {
      updatedParts[categoryName as keyof typeof updatedParts] = {
        variantId: selectedVariant.id,
        variantOptionValues: selectedVariant.optionValues,
        productName: product.name,
        image: product.images[0].imageUrl,
        cloudinaryId: product.images[0].cloudinaryId,
        price: selectedVariant.price,
        color: selectedVariant.colorName,
        quantity: 1,
      };
    }
    setParts(updatedParts);
  };

  return (
    <ModalContainer className={`${display ? 'show' : ''}`}>
      <Close
        onClick={() => {
          setDisplay(false);
        }}
      >
        &times;
      </Close>
      {loading && <LoadingSpinner />}
      {product && (
        <InnerContainer>
          <ImagesBox>
            <MainImageWrapper>
              <img src={mainImage?.imageUrl} alt={mainImage?.name} />
            </MainImageWrapper>
            {imagesThumbs && imagesThumbs.length > 1 && (
              <ThumbContainer>
                {imagesThumbs.map((imagesThumb) => (
                  <ThumbWrapper
                    onClick={() => {
                      setMainImage(imagesThumb);
                    }}
                  >
                    <img src={imagesThumb.imageUrl} alt={imagesThumb.name} />
                  </ThumbWrapper>
                ))}
              </ThumbContainer>
            )}
          </ImagesBox>
          <ProductDescription>
            <Link to={`/brands/${product.brandSlug}`}>
              <img
                src={product.brandLogoUrl}
                alt={product.brandSlug}
                style={{ width: '50px', height: 'auto' }}
              />
            </Link>
            <h1>{product.name}</h1>
            {options &&
              options.length > 0 &&
              options[0].name !== 'default' &&
              options.map((option) => (
                <>
                  <p>{option.name.toUpperCase()}</p>
                  {option?.optionValues.map((optionValue) =>
                    selectedOptionValues[option.name] === optionValue ? (
                      <SelectedVariantBox
                        onClick={() => {
                          selectVariant(optionValue, option.name);
                        }}
                      >
                        <p>{optionValue}</p>
                      </SelectedVariantBox>
                    ) : (
                      <VariantBox
                        onClick={() => {
                          selectVariant(optionValue, option.name);
                        }}
                      >
                        <p>{optionValue}</p>
                      </VariantBox>
                    )
                  )}
                </>
              ))}
            {selectedVariant && <p>${selectedVariant.price}</p>}
            <p>{product.description}</p>
            <AddToCartButton
              onClick={() => {
                addToCart(product.categoryName);
              }}
            >
              Add to builder
            </AddToCartButton>
          </ProductDescription>
        </InnerContainer>
      )}
    </ModalContainer>
  );
};
