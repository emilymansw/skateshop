import styled from 'styled-components';
import { useEffect, useState } from 'react';

const EarningsCard = styled.div`
  display: flex;
  justify-content: center;
  margin: 2px 14px;
  width: 9rem;
  border-radius: 1rem;
  transition: 0.4s ease-in-out;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: auto;
    margin: 2px 7px;
  }
`;

const CardContent = styled.div`
  margin: 0.5rem;
  width: 150px;
  height: 150px;
  @media (max-width: 768px) {
    width: 20vw;
    height: 20vw;
  }
`;

const EarningsText = styled.h3`
  margin: 0;
  margin-top: 0.3em;
  text-align: center;
  font-weight: normal;
  @media (max-width: 768px) {
    font-size: 0.8em;
    margin-top: 0.2em;
  }
`;

const Image = styled.img`
  width: auto;
  height: 80%;
  display: block;
  margin: auto;
`;

export const Selection = ({
  type,
  icon,
  onClick,
  productImage,
}: {
  type: string;
  icon: string;
  onClick: () => void;
  productImage: string | undefined;
}) => {
  const [image, setImage] = useState(icon);

  useEffect(() => {
    if (productImage) setImage(productImage);
  }, [productImage]);

  return (
    <EarningsCard onClick={onClick}>
      <CardContent>
        <EarningsText>{type}</EarningsText>
        {image ? <Image src={image} alt="" /> : <Image src={icon} alt="" />}
      </CardContent>
    </EarningsCard>
  );
};
