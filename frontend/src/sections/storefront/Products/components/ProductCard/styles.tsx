import styled from 'styled-components';

export const Card = styled.div`
  width: 20vw;
  height: auto;
  margin: 0 auto;
  text-align: center;
  padding: 30px;
  :hover {
    transform: scale(1.05);
  }
  h1,
  p {
    font-size: small;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

export const ImageWrapper = styled.div`
  margin: auto;
  width: 15vw;
  height: 15vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
