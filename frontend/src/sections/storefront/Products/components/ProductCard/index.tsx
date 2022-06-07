import { Card, ImageWrapper } from './styles';
import { IImageData, IVariantData } from '../../../../../types/product';

export const ProductCard = ({
  name,
  variants,
  images,
  onClick,
}: // onClick,
{
  name: string;
  variants: IVariantData[];
  images: IImageData[];
  onClick?: () => void;
}) => (
  //
  <Card onClick={onClick}>
    <ImageWrapper>
      <img src={images[0].imageUrl} alt="mainImage" />
    </ImageWrapper>
    <h1>{name}</h1>
    <p>
      price: $
      {variants.length === 1 ? (
        variants[0].price
      ) : (
        <span>
          {variants.reduce((prev, curr) => Math.min(prev, curr.price), 100000)}
          up
        </span>
      )}
    </p>
  </Card>
);
