import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useGetRenderImg } from '../../../../../api/APIService';
import { addBundle } from '../../../../../redux/cartSlice';
import { LoadingSpinner, LoginButton } from '../../../../shared/UI/SharedUI';
import {
  IPartsInfoData,
  ICompletedPartsInfoData,
} from '../../../../../types/product';
import { useAppDispatch } from '../../../../../redux/hook';

const Container = styled.div`
  margin: auto;
  width: 400px;
  @media (max-width: 768px) {
    width: 85%;
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: 500px;
  padding: 10px 0px;
  img {
    width: 90%;
    height: auto;
    max-height: 350px;
    object-fit: contain;
    margin: auto;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

const OutsideContainer = styled.div`
  margin: auto;
  width: 1000px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
  }
`;

interface ICloudinaryParam {
  deck: string;
  gripeTape: string;
  truckColor: string;
  wheelColor: string;
}

export const Info = ({
  currentTotal,
  parts,
  setCurrentTotal,
  isCompleted,
  setIsCompleted,
}: {
  currentTotal: number;
  parts: IPartsInfoData;
  setCurrentTotal: React.Dispatch<React.SetStateAction<number>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [cloudinaryParam, setCloudiaryParam] = useState<
    ICloudinaryParam | undefined
  >();
  const { fetchData, data: renderData, error, loading } = useGetRenderImg();
  const dispatch = useAppDispatch();

  const addBundleToCart = () => {
    if (isCompleted) {
      const completeParts = parts as ICompletedPartsInfoData;
      dispatch(addBundle({ parts: completeParts, bundleTotal: currentTotal }));
    }
  };

  useEffect(() => {
    setCloudiaryParam({
      deck: parts.deck.cloudinaryId || '',
      gripeTape: parts.gripTape.cloudinaryId || '',
      truckColor: parts.truck.color || '',
      wheelColor: parts.wheel.color || '',
    });
  }, [parts]);

  useEffect(() => {
    let sum = 0;
    let completed = true;
    Object.keys(parts).forEach((key) => {
      const { price } = parts[key as keyof typeof parts];
      if (price === undefined) {
        completed = false;
      } else if (key === 'truck') {
        sum += price * 2;
      } else {
        sum += price;
      }
      setCurrentTotal(sum);
      setIsCompleted(completed);
    });
  }, [parts]);

  return (
    <OutsideContainer>
      <ImageContainer>
        {!renderData && (
          <img
            src="https://res.cloudinary.com/drvuz5jme/image/upload/v1652165954/sample_obxrh6.jpg"
            alt="dd"
          />
        )}
        {loading && <LoadingSpinner />}
        {renderData && <img src={renderData} alt="render" />}
      </ImageContainer>
      <Container>
        <p>
          Click a part below and select the item to add to Skateboard Builder.
          After you selected all parts, click Show me to see how your board look
          like just like the example!
        </p>
        <h4>Complete Total: ${currentTotal}</h4>
        {isCompleted ? (
          <LoginButton
            type="submit"
            onClick={() => {
              if (cloudinaryParam) {
                fetchData('', cloudinaryParam, {});
              }
            }}
          >
            Show Me
          </LoginButton>
        ) : (
          <LoginButton type="submit">
            Select all parts to see preview
          </LoginButton>
        )}
        {isCompleted ? (
          <LoginButton type="submit" onClick={addBundleToCart}>
            Add Current Setup To Cart
          </LoginButton>
        ) : (
          <LoginButton type="submit">
            Select all parts to add To Cart
          </LoginButton>
        )}
      </Container>
    </OutsideContainer>
  );
};
