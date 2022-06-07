import { ICartItemData } from '../../../../../types/product';
import {
  addOneToItem,
  changeItemQuantity,
  minusOneFromItem,
  removeItem,
} from '../../../../../redux/cartSlice';
import { useAppDispatch } from '../../../../../redux/hook';
import {
  NameWrapper,
  LineItem,
  ImageWrapper,
  ImageContainer,
  QuantityInput,
  CounterBox,
  PriceWrapper,
  QuantityWrapper,
  TrashIcon,
} from './styles';

export const CartItems = ({
  cartItems,
  total,
  totalQuantity,
}: {
  cartItems: ICartItemData[];
  total: number;
  totalQuantity: number;
}) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantId: number
  ) => {
    dispatch(
      changeItemQuantity({
        variantId,
        quantity: parseInt(e.target.value),
      })
    );
  };

  const addOne = (variantId: number) => {
    dispatch(addOneToItem(variantId));
  };

  const deductOne = (variantId: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(minusOneFromItem(variantId));
    }
  };

  const remove = (variantId: number) => {
    dispatch(removeItem(variantId));
  };

  return (
    <>
      <h1>Cart</h1>
      {total === 0 && totalQuantity === 0
        ? 'Your cart is empty'
        : cartItems.map((cartItem, index) => (
            <LineItem key={index}>
              <ImageWrapper>
                <ImageContainer>
                  <img src={cartItem.image} alt="mainImage" />
                </ImageContainer>
              </ImageWrapper>
              <NameWrapper>
                <div>
                  <h4>{cartItem.productName} </h4>
                  {cartItem.variantOptionValues[0] !== 'default' &&
                    cartItem.variantOptionValues.map((variantOptionValue) => (
                      <p>{variantOptionValue} </p>
                    ))}
                </div>
              </NameWrapper>
              <PriceWrapper>
                <h4>${cartItem.price}</h4>
              </PriceWrapper>
              <QuantityWrapper>
                <CounterBox
                  onClick={() => {
                    deductOne(cartItem.variantId, cartItem.quantity);
                  }}
                >
                  -
                </CounterBox>
                <QuantityInput
                  type="text"
                  value={cartItem.quantity}
                  onChange={(e) => {
                    handleQuantityChange(e, cartItem.variantId);
                  }}
                />
                <CounterBox
                  onClick={(e) => {
                    addOne(cartItem.variantId);
                  }}
                >
                  +
                </CounterBox>
                <TrashIcon
                  onClick={() => {
                    remove(cartItem.variantId);
                  }}
                />
              </QuantityWrapper>
            </LineItem>
          ))}
      <hr />
      <h4>Total Amount: ${total}</h4>
      <h4>Total Quantity: {totalQuantity}</h4>
    </>
  );
};
