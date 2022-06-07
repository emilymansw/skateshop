import { Link } from 'react-router-dom';
import { CartItems } from './components';
import { Container } from '../../shared/UI/SharedUI';
import { useAppSelector } from '../../../redux/hook';
import { CheckoutButton } from './style';

export const Cart = () => {
  const { cartItems, total, totalQuantity } = useAppSelector(
    (state) => state.cart
  );

  return (
    <Container>
      <CartItems
        cartItems={cartItems}
        total={total}
        totalQuantity={totalQuantity}
      />
      {total !== 0 && totalQuantity !== 0 && (
        <Link to="/checkout">
          <CheckoutButton>Checkout</CheckoutButton>
        </Link>
      )}
    </Container>
  );
};
