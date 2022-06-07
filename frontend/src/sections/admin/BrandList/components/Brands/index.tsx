import { Link } from 'react-router-dom';
import { Container, Wrapper, Description, BannerImg, LogoImg } from './styles';
import { useGetBrands } from '../../../../../api/APIService';
import {
  ButtonContainer,
  HeaderContainer,
  Column,
  LargeColumn,
  LoadingSpinner,
  SmButton,
} from '../../../../shared/UI/SharedUI';

export const Brands = () => {
  const { fetchData, data: brandsData, loading, error } = useGetBrands();
  if (loading) return <LoadingSpinner />;
  return (
    <Container>
      <Wrapper>
        <Link to="/admin/createBrand">
          <SmButton type="submit">add brand</SmButton>
        </Link>
      </Wrapper>
      <HeaderContainer>
        <Column>
          <h4>Name</h4>
        </Column>
        <Column>
          <h4>Logo </h4>
        </Column>
        <LargeColumn>
          <h4>Description</h4>
        </LargeColumn>
        <LargeColumn>
          <h4>Banner</h4>
        </LargeColumn>
      </HeaderContainer>
      {brandsData &&
        brandsData?.map((brand) => (
          <Link
            to={`/admin/brand/${brand.slug}`}
            state={{ brand }}
            key={brand.id}
          >
            <ButtonContainer>
              <Column>
                <p>{brand.name}</p>
              </Column>
              <Column>
                <LogoImg src={brand.logoUrl} alt={brand.name} />
              </Column>
              <LargeColumn>
                <Description>{brand.description}</Description>
              </LargeColumn>
              <LargeColumn>
                <BannerImg src={brand.bannerUrl} alt={brand.name} />
              </LargeColumn>
            </ButtonContainer>
          </Link>
        ))}
    </Container>
  );
};
