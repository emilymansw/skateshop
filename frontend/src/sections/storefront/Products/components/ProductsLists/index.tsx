import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  useGetLiveProducts,
  useGetProductsUnderCat,
  useGetSearchResult,
} from '../../../../../api/APIService';
import { PageContext } from '../../../../../Context';
import { IProductData } from '../../../../../types/product';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { ProductsListUI } from '../ProductsListUI';
import { NotFound } from '../../../../shared/components/NotFound';

export const AllProductsList = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const { page, setPage } = useContext(PageContext);
  const [totalPages, settotalPages] = useState<number>();
  const {
    fetchData,
    data: productsData,
    error,
    loading,
  } = useGetLiveProducts(page);

  useEffect(() => {
    fetchData('', { page }, {});
  }, [page]);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.content);
      settotalPages(productsData.totalPages);
    }
  }, [productsData]);

  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404 && !products) return <NotFound />;
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

export const CatProductList = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const { categorySlug } = useParams();
  const { page, setPage } = useContext(PageContext);
  const [totalPages, setTotalPages] = useState<number>();
  const { fetchData, data, error, loading } = useGetProductsUnderCat(
    categorySlug as string,
    page
  );

  useEffect(() => {
    fetchData(categorySlug as string, { page }, {});
  }, [categorySlug, page]);

  useEffect(() => {
    if (data) {
      setProducts(data.content);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
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

export const SearchProductList = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const { page, setPage } = useContext(PageContext);
  const [totalPages, setTotalPages] = useState<number>();
  const searchQuery = new URLSearchParams(useLocation().search).get('q');

  const { fetchData, loading, error, data } = useGetSearchResult(
    searchQuery as string,
    page
  );

  useEffect(() => {
    fetchData('', { q: searchQuery, page }, {});
  }, [searchQuery, page]);

  useEffect(() => {
    if (data) {
      setProducts(data.content);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
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
