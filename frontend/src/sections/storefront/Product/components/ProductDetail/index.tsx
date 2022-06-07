import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ProductContainer,
  ImagesBox,
  MainImageWrapper,
  MiniusButton,
  AddToCartButton,
  ThumbContainer,
  ThumbWrapper,
  PlusButtom,
  ProductDescription,
  VariantBox,
  QuantityBox,
  QuantityButtonContainer,
  QuantityInput,
  SelectedVariantBox,
  Price,
  CompareAtPrice,
  OptionContainer,
} from './style';
import { useGetProduct } from '../../../../../api/APIService';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { addProduct } from '../../../../../redux/cartSlice';
import {
  IProductData,
  IVariantData,
  IOptionData,
  IImageData,
} from '../../../../../types/product';
import { useAppDispatch } from '../../../../../redux/hook';
import { NotFound } from '../../../../shared/components/NotFound';

export const ProductDetail = () => {
  const { slug } = useParams();
  const {
    fetchData,
    data: productData,
    error,
    loading,
  } = useGetProduct(slug as string);
  const [product, setProduct] = useState<IProductData | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [variants, setVariants] = useState<IVariantData[] | undefined>();
  const [selectedVariant, setSelectedVariant] = useState<
    IVariantData | undefined
  >();
  const [options, setOptions] = useState<IOptionData[] | undefined>();
  const [imagesThumbs, setImagesThumbs] = useState<IImageData[] | undefined>();
  const [mainImage, setMainImage] = useState<IImageData | undefined>();
  const dispatch = useAppDispatch();
  const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(
    []
  );

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
    if (variants) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  useEffect(() => {
    if (options) {
      const initialSelectedOptionValues: string[] = [];
      options.forEach(({ optionValues }) => {
        initialSelectedOptionValues.push(optionValues[0]);
      });
      setSelectedOptionValues(initialSelectedOptionValues);
    }
  }, [options]);

  const updateOptionValue = (option: IOptionData, newOptionValue: string) => {
    let currentSelected = [...selectedOptionValues];
    option.optionValues.forEach(
      (optionValue) =>
        (currentSelected = currentSelected.filter(
          (currentOptionvalues) => currentOptionvalues !== optionValue
        ))
    );
    currentSelected.push(newOptionValue);
    setSelectedOptionValues(currentSelected);
  };

  useEffect(() => {
    if (variants) {
      variants.forEach((variant) => {
        if (
          variant.optionValues.every((optionValues) =>
            selectedOptionValues.includes(optionValues)
          )
        ) {
          setSelectedVariant(variant);
        }
      });
    }
  }, [selectedOptionValues]);

  const addToCart = () => {
    if (selectedVariant && product && selectedVariant.id) {
      dispatch(
        addProduct({
          variantId: selectedVariant.id,
          variantOptionValues: selectedVariant.optionValues,
          productName: product.name,
          image: product.images[0].imageUrl,
          price: selectedVariant.price,
          quantity,
        })
      );
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
  if (product)
    return (
      <ProductContainer>
        <ImagesBox>
          <MainImageWrapper>
            <img src={mainImage?.imageUrl} alt={mainImage?.name} />
          </MainImageWrapper>
          {imagesThumbs && imagesThumbs.length > 1 && (
            <ThumbContainer>
              {imagesThumbs?.map((imagesThumb, index) => (
                <ThumbWrapper
                  key={index}
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
              <OptionContainer>
                <p>{option.name}</p>
                {option?.optionValues.map((optionValue) =>
                  selectedOptionValues.includes(optionValue) ? (
                    <SelectedVariantBox
                      onClick={() => {
                        updateOptionValue(option, optionValue);
                      }}
                    >
                      <p>{optionValue}</p>
                    </SelectedVariantBox>
                  ) : (
                    <VariantBox
                      onClick={() => {
                        updateOptionValue(option, optionValue);
                        setQuantity(1);
                      }}
                    >
                      <p>{optionValue}</p>
                    </VariantBox>
                  )
                )}
              </OptionContainer>
            ))}
          {selectedVariant && (
            <div>
              {selectedVariant.compareAtPrice > selectedVariant.price && (
                <CompareAtPrice>
                  ${selectedVariant.compareAtPrice}
                </CompareAtPrice>
              )}
              <Price
                className={
                  selectedVariant.compareAtPrice > selectedVariant.price
                    ? 'reduced'
                    : 'original'
                }
              >
                ${selectedVariant.price}
              </Price>
            </div>
          )}
          <p>{product.description}</p>
          <AddToCartButton
            onClick={addToCart}
            disabled={selectedVariant?.stock === 0}
          >
            {selectedVariant?.stock === 0 ? (
              <>Out of Stock</>
            ) : (
              <>Add to Cart</>
            )}
          </AddToCartButton>
          <QuantityBox>
            <QuantityInput
              type="text"
              name="qty"
              value={quantity}
              onChange={(e) => {
                if (selectedVariant) {
                  if (Number(e.target.value) < selectedVariant?.stock) {
                    setQuantity(Number(e.target.value));
                  } else {
                    alert(
                      `The item you selected has only ${selectedVariant?.stock} pieces`
                    );
                  }
                }
              }}
            />
            <QuantityButtonContainer>
              <PlusButtom
                onClick={() => {
                  if (selectedVariant) {
                    if (quantity < selectedVariant?.stock) {
                      setQuantity(quantity + 1);
                    } else {
                      alert(
                        `The item you selected has only ${selectedVariant?.stock} pieces`
                      );
                    }
                  }
                }}
              >
                +
              </PlusButtom>
              <MiniusButton
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </MiniusButton>
            </QuantityButtonContainer>
          </QuantityBox>
        </ProductDescription>
      </ProductContainer>
    );

  return null;
};
