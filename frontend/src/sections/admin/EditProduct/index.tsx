import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetProduct } from '../../../api/APIService';
import { IProductData } from '../../../types/product';
import { Editor } from './components';

export const EditProduct = () => {
  const { slug } = useParams();
  const {
    fetchData,
    data: productData,
    error,
    loading,
  } = useGetProduct(slug as string);
  const [product, setProduct] = useState<IProductData>();
  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [loading]);

  return <Editor product={product} />;
};
