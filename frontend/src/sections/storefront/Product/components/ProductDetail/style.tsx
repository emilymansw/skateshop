import styled from 'styled-components';

export const ProductContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductDescription = styled.div`
  width: 650px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const MainImageWrapper = styled.div`
  width: 40vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 60vw;
    height: 60vw;
  }
  img {
    width: 60%;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin: auto;
  }
`;

export const ThumbWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  border: solid LightGray;
  margin: 5px 5px;
  cursor: pointer;
  :hover {
    border: solid DimGray;
  }
  img {
    width: 90%;
    height: auto;
    object-fit: contain;
  }
`;

export const ThumbContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ImagesBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const AddToCartButton = styled.button`
  background: none;
  border: 1px solid #515151;
  padding: 8px 0px;
  margin-bottom: 30px;
  text-transform: uppercase;
  width: 125px;
  height: 53px;
  margin-right: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.9em;

  &:hover {
    border: 1px solid #a9a9a9;
    color: #a9a9a9;
    cursor: pointer;
  }
`;

export const QuantityBox = styled.div`
  float: left;
  width: 80px;
  margin-right: 10px;
  user-select: none;
`;

export const MiniusButton = styled.div`
  float: left;
  text-align: center;
  width: 30px;
  cursor: pointer;
  font-size: 1.2em;
  height: 25px;
  vertical-align: middle;
  border: 1px solid #515151;
`;

export const PlusButtom = styled.div`
  float: left;
  text-align: center;
  width: 30px;
  cursor: pointer;
  font-size: 1.2em;
  height: 25px;
  vertical-align: middle;
  border: 1px solid #515151;
  border-bottom: 0;
`;

export const QuantityButtonContainer = styled.div`
  float: left;
  width: 10px;
  height: 50px;
  display: inline-block;
`;

export const QuantityInput = styled.input`
  float: left;
  outline: 0;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  width: 50px;
  height: 49px;
  line-height: 40px;
  border: 1px solid #515151;
  border-right: 0;
`;

export const VariantBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid #515151;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  margin: 0px 5px 5px 0px;
  font-weight: bold;
  display: inline-block;
`;

export const SelectedVariantBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1.35px solid #a9a9a9;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  margin: 0px 5px 5px 0px;
  font-weight: bold;
  display: inline-block;
`;

export const Price = styled.span`
  font-weight: semi-bold;
  font-size: 150%;
  margin-right: 10px;
  margin-top: 10px;
  &.reduced {
    color: red;
    font-weight: semi-bold;
    display: inline;
  }
`;

export const CompareAtPrice = styled.span`
  font-weight: semi-bold;
  font-size: 150%;
  text-decoration: line-through;
  color: grey;
  margin-right: 10px;
`;

export const OptionContainer = styled.div`
  margin-bottom: 10px;
`;
