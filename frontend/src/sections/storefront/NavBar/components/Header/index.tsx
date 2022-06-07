import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { useAppSelector } from '../../../../../redux/hook';
import {
  Wrapper,
  Box,
  CartIcon,
  UserIcon,
  Count,
  CartContainer,
} from './styles';
import { StoreLogo } from '../../../../shared/UI/SharedUI';

export const Header = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <Wrapper>
      <Link to="/">
        <StoreLogo
          src="https://res.cloudinary.com/drvuz5jme/image/upload/v1653535158/skateshop/Screenshot_2022-05-26_at_11.18.30_AM_b7bxxo.png"
          alt="logo"
        />
      </Link>
      <SearchBar />
      <Box>
        <Link to="/cart">
          <CartContainer>
            <CartIcon />
            <Count>{totalQuantity}</Count>
          </CartContainer>
        </Link>
        <Link to="/account">
          <UserIcon />
        </Link>
      </Box>
    </Wrapper>
  );
};
