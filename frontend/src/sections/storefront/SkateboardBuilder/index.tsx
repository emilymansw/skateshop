import { useState } from 'react';
import { Container } from './styles';
import { IPartsInfoData } from '../../../types/product';
import { CatProducts, Combination, Info } from './components';

export const SkateboardBuilder = () => {
  const [categorySlug, setCategorySlug] = useState<string>('deck');
  const [page, setPage] = useState(1);
  const [parts, setParts] = useState<IPartsInfoData>({
    deck: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
    gripTape: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
    truck: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
    wheel: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
    hardware: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
    bearing: {
      variantId: undefined,
      variantOptionValues: undefined,
      productName: undefined,
      image: undefined,
      price: undefined,
      quantity: undefined,
      cloudinaryId: undefined,
      color: undefined,
    },
  });
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  return (
    <Container>
      <Info
        currentTotal={currentTotal}
        parts={parts}
        setCurrentTotal={setCurrentTotal}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
      <Combination
        setCategorySlug={setCategorySlug}
        setPage={setPage}
        parts={parts}
      />
      <CatProducts
        categorySlug={categorySlug}
        page={page}
        setPage={setPage}
        parts={parts}
        setParts={setParts}
      />
    </Container>
  );
};
