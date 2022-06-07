import styled from 'styled-components';
import { FaRegTrashAlt } from 'react-icons/fa';

export const LineItem = styled.div`
  width: 1000px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  p,
  h4 {
    margin: 0.5em 0em;
  }
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: start;
  }
`;

export const ImageWrapper = styled.div`
  flex-grow: 1;
`;

export const ImageContainer = styled.div`
  width: 100px;
  margin: auto;
  text-align: center;
  img {
    object-fit: contain;
    height: 80px;
    width: auto;
    max-width: 100px;
    object-position: 50% 50%;
  }
`;
export const NameWrapper = styled.div`
  flex-grow: 2;
  div {
    width: 300px;
  }
`;

export const QuantityWrapper = styled.div`
  flex-grow: 2;
`;

export const PriceWrapper = styled.div`
  flex-grow: 1;
`;

export const QuantityInput = styled.input`
  height: 34px;
  width: 100px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 15vw;
  }
`;

export const CounterBox = styled.div`
  width: 20px;
  height: 20px;
  background: #f2f2f2;
  border-radius: 4px;
  padding: 8px 5px 8px 5px;
  border: 1px solid #ddd;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 5vw;
  }
`;

export const TrashIcon = styled(FaRegTrashAlt)`
  cursor: pointer;
  margin: 0px 8px;
`;
