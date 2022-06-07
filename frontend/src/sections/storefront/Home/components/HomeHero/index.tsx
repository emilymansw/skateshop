import { Link } from 'react-router-dom';
import { AllProductsList } from '../../../Products/components/ProductsLists';
import { BannerImg } from '../../../../shared/UI/SharedUI';

export const HomeHero = () => (
  <>
    <Link to="/skateboardBuilder">
      <BannerImg
        src="https://res.cloudinary.com/drvuz5jme/image/upload/v1652171278/skateshop/1468852281-49021700_u0kxvt.png"
        alt=""
      />
    </Link>
    <AllProductsList />
  </>
);
