import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsUnderBrand } from '../../../../../api/APIService';
import { PageContext } from '../../../../../Context';
import { IProductData } from '../../../../../types/product';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { ProductsListUI } from '../../../Products/components/ProductsListUI';

export const BrandProductList = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const { brandSlug } = useParams();
  const { page, setPage } = useContext(PageContext);
  const [totalPages, settotalPages] = useState<number>();

  const { fetchData, loading, error, data } = useGetProductsUnderBrand(
    brandSlug as string,
    page
  );

  useEffect(() => {
    fetchData(brandSlug as string, { page }, {});
  }, [brandSlug, page]);

  useEffect(() => {
    if (data) {
      setProducts(data.content);
      settotalPages(data.totalPages);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (products?.length === 0) return <p>no matching products</p>;
  if (products?.length > 0)
    return (
      <ProductsListUI
        products={products}
        totalPages={totalPages}
        setPage={setPage}
        page={page}
        type="navigation"
      />
    );
  return null;
};
