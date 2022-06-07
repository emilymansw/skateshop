import { useState, useEffect } from 'react';
import { useGetProductsUnderCat } from '../../../../../api/APIService';
import { ProductsListUI } from '../../../Products/components/ProductsListUI';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { IPartsInfoData, IProductData } from '../../../../../types/product';

export const CatProducts = ({
  categorySlug,
  page,
  setPage,
  parts,
  setParts,
}: {
  categorySlug: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  parts: IPartsInfoData;
  setParts: React.Dispatch<React.SetStateAction<IPartsInfoData>>;
}) => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const { fetchData, data, error, loading } = useGetProductsUnderCat(
    categorySlug,
    page
  );

  useEffect(() => {
    fetchData(categorySlug, { page }, {});
  }, [categorySlug, page]);

  useEffect(() => {
    if (data) {
      setProducts(data.content);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (products?.length === 0) return <p>no matching products</p>;
  return (
    <ProductsListUI
      products={products}
      totalPages={totalPages}
      setPage={setPage}
      page={page}
      type="modal"
      parts={parts}
      setParts={setParts}
    />
  );
};
