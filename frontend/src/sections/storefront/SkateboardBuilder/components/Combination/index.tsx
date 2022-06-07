import styled from 'styled-components';
import { IPartsInfoData } from '../../../../../types/product';
import { Selection } from '../Selection';

const Container = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const Combination = ({
  setCategorySlug,
  setPage,
  parts,
}: {
  setCategorySlug: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  parts: IPartsInfoData;
}) => (
  <Container>
    <Selection
      onClick={() => {
        setCategorySlug('deck');
        setPage(1);
      }}
      type="Deck"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/deck-600x600_1_s3kd2j.png"
      productImage={parts.deck.image}
    />
    <Selection
      type="Grip Tape"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/griptape-600x600_zchwpw.png"
      productImage={parts.gripTape.image}
      onClick={() => {
        setCategorySlug('grip-tape');
        setPage(1);
      }}
    />
    <Selection
      type="Truck"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/trucks-600x600_skptyh.png"
      productImage={parts.truck.image}
      onClick={() => {
        setCategorySlug('truck');
        setPage(1);
      }}
    />
    <Selection
      type="Wheels"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/wheels-600x600_xgavta.png"
      productImage={parts.wheel.image}
      onClick={() => {
        setCategorySlug('wheel');
        setPage(1);
      }}
    />
    <Selection
      type="Bearing"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/bearings-600x600_ewiyta.png"
      productImage={parts.bearing.image}
      onClick={() => {
        setCategorySlug('bearing');
        setPage(1);
      }}
    />
    <Selection
      type="Hardwares"
      key="hardware"
      icon="https://res.cloudinary.com/drvuz5jme/image/upload/v1651719703/skateshop/hardware-600x600_idt3um.png"
      productImage={parts.hardware.image}
      onClick={() => {
        setCategorySlug('hardware');
        setPage(1);
      }}
    />
  </Container>
);
