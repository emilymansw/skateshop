import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 500px;
  margin: 10px auto;
`;

export const LineItem = styled.div`
  width: 500px;
  margin: 20px auto;
  display: flex;
  align-items: start;
`;

export const ImageWrapper = styled.div`
  flex-grow: 1;
`;

export const ImageContainer = styled.div`
  width: 70px;
  margin: auto;
  img {
    object-fit: contain;
    height: 60px;
    width: auto;
    max-width: 70px;
  }
`;
export const NameWrapper = styled.div`
  flex-grow: 2;
  div {
    width: 300px;
    h4,
    p {
      margin: 5px auto;
    }
  }
`;

export const QuantityWrapper = styled.div`
  flex-grow: 2;
  h4 {
    margin: 5px auto;
  }
`;

export const PriceWrapper = styled.div`
  flex-grow: 1;
  h4 {
    margin: 5px auto;
  }
`;
