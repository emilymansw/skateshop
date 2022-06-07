import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ListContainer, CardContainer } from './styles';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../../../../shared/components/Pagination';
import { ProductModal } from '../../../SkateboardBuilder/components/ProductModal';
import { IProductData, IPartsInfoData } from '../../../../../types/product';

export const ProductsListUI = ({
  products,
  totalPages,
  setPage,
  page,
  type,
  parts,
  setParts,
}: {
  products: IProductData[];
  totalPages: number | undefined;
  setPage: (pageState: number) => void;
  page: number;
  type: string;
  parts?: IPartsInfoData;
  setParts?: React.Dispatch<React.SetStateAction<IPartsInfoData>>;
}) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [slugToModal, setSlugToModal] = useState<string>();
  return (
    <ListContainer>
      <CardContainer>
        {products.map(({ id, name, variants, images, slug }) => (
          <div key={id}>
            {type === 'navigation' && (
              <Link to={`/product/${slug}`}>
                <ProductCard name={name} variants={variants} images={images} />
              </Link>
            )}
            {type === 'modal' && (
              <ProductCard
                name={name}
                variants={variants}
                images={images}
                onClick={() => {
                  setModalDisplay(true);
                  setSlugToModal(slug);
                }}
              />
            )}
          </div>
        ))}
        {type === 'modal' &&
          modalDisplay &&
          slugToModal &&
          parts &&
          setParts && (
            <ProductModal
              slug={slugToModal}
              display={modalDisplay}
              setDisplay={setModalDisplay}
              parts={parts}
              setParts={setParts}
            />
          )}
      </CardContainer>
      {totalPages && totalPages > 1 && (
        <Pagination totalPages={totalPages} setPage={setPage} page={page} />
      )}
    </ListContainer>
  );
};
