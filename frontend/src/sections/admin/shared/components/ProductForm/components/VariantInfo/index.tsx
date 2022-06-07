import { IVariantData } from '../../../../../../../types/product';
import {
  Divider,
  VariantContainer,
} from '../../../../../../shared/UI/SharedUI';

interface IHandleChangeFunction {
  (e: React.ChangeEvent<HTMLInputElement>, variantIndexParam: number): void;
}

export const VariantInfo = ({
  variants,
  handleVariantPriceChange,
  handleVariantCompareAtPriceChange,
  handleVariantStockChange,
  handleVariantWeightChange,
  variantIndex,
  handleVariantColorChange,
}: {
  variants: IVariantData[];
  handleVariantPriceChange: IHandleChangeFunction;
  handleVariantCompareAtPriceChange: IHandleChangeFunction;
  handleVariantStockChange: IHandleChangeFunction;
  handleVariantWeightChange: IHandleChangeFunction;
  handleVariantColorChange: IHandleChangeFunction;
  variantIndex: number;
}) => (
  <VariantContainer>
    <p>
      {variants[variantIndex].optionValues?.map(
        (optionValue, index, optionValues) => (
          <span key={optionValue}>
            {optionValue !== 'default' && optionValue}
            {index === optionValues.length - 1 ? '' : '/ '}
          </span>
        )
      )}
    </p>

    <span className="variant">Price:</span>
    <input
      type="text"
      value={variants[variantIndex].price}
      onChange={(e) => {
        handleVariantPriceChange(e, variantIndex);
      }}
    />
    <span className="variant">Compare at Price: </span>
    <input
      type="text"
      value={variants[variantIndex].compareAtPrice}
      onChange={(e) => {
        handleVariantCompareAtPriceChange(e, variantIndex);
      }}
    />
    <span className="variant">Stock:</span>
    <input
      type="text"
      value={variants[variantIndex].stock}
      onChange={(e) => {
        handleVariantStockChange(e, variantIndex);
      }}
    />
    <span className="variant">Weight: </span>
    <input
      type="text"
      value={variants[variantIndex].weight}
      onChange={(e) => {
        handleVariantWeightChange(e, variantIndex);
      }}
    />
    <span className="variant">Color:</span>
    <input
      type="text"
      className="color"
      value={variants[variantIndex].colorName}
      onChange={(e) => {
        handleVariantColorChange(e, variantIndex);
      }}
    />
    <Divider />
  </VariantContainer>
);
