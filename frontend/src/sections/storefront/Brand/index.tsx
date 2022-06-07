import { useParams } from 'react-router-dom';
import { HeroSection, BrandProductList } from './components';
import { useGetBrand } from '../../../api/APIService';
import { Container, LoadingSpinner } from '../../shared/UI/SharedUI';
import { NotFound } from '../../shared/components/NotFound';

export const Brand = () => {
  const { brandSlug } = useParams();
  const { data: brandData, loading, error } = useGetBrand(brandSlug as string);
  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
  if (brandData)
    return (
      <Container>
        <HeroSection brand={brandData} />
        <BrandProductList />
      </Container>
    );

  return null;
};
