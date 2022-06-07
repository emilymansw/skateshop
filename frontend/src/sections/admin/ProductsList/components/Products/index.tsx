import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Container, Wrapper, Thumbnail } from './styles';
import { useGetProducts, usePatchProduct } from '../../../../../api/APIService';
import { PageContext } from '../../../../../Context';
import {
  SmButton,
  ButtonContainer,
  HeaderContainer,
  Column,
  LargeColumn,
  MobileTag,
} from '../../../../shared/UI/SharedUI';
import { IProductData } from '../../../../../types/product';
import { Pagination } from '../../../../shared/components';

export const Products = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const { page, setPage } = useContext(PageContext);
  const {
    fetchData,
    data: productsData,
    error: allProductsError,
    loading: allProductsLoading,
  } = useGetProducts(page);

  const {
    fetchData: patchStatus,
    data: patchProductsData,
    error: patchProductsError,
    loading: patchProductsLoading,
  } = usePatchProduct();

  useEffect(() => {
    fetchData('', { page }, {});
    if (productsData) {
      setProducts(productsData.content);
    }
  }, [productsData, patchProductsData]);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.content);
      setTotalPages(productsData.totalPages);
    }
  }, [productsData]);

  return (
    <Container>
      <Wrapper>
        <Link to="/admin/createProduct">
          <SmButton type="submit">add product</SmButton>
        </Link>
      </Wrapper>
      <HeaderContainer>
        <Column>
          <h4>Product Image</h4>
        </Column>
        <LargeColumn>
          <h4>Product Name</h4>
        </LargeColumn>
        <Column>
          <h4>Category</h4>
        </Column>
        <Column>
          <h4>Change Visibility</h4>
        </Column>
      </HeaderContainer>
      {products &&
        products.map((product) => (
          <Link to={`/admin/product/${product.slug}`} key={product.id}>
            <ButtonContainer key={product.id}>
              <Column>
                <Thumbnail src={product.images[0].imageUrl} alt="" />
              </Column>
              <LargeColumn>
                <h4>{product.name}</h4>
              </LargeColumn>
              <Column>
                <MobileTag>Category -</MobileTag>
                {product.categoryName}
              </Column>
              <Column>
                <MobileTag>Change Visibility -</MobileTag>
                <SmButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (product) {
                      patchStatus(product.id.toString(), {}, {});
                    }
                  }}
                >
                  {product.live ? <>hide product</> : <>push to store</>}
                </SmButton>
              </Column>
            </ButtonContainer>
          </Link>
        ))}
      {totalPages && totalPages > 1 && (
        <Pagination totalPages={totalPages} setPage={setPage} page={page} />
      )}
    </Container>
  );
};
