import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px 20px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const TextareaWrapper = styled.div`
  margin: 5px;
  width: 80%;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 80vw;
  }
  textarea {
    width: 80%;
    outline: none;
    border: 1px solid #999;
    font-size: 16px;
    position: relative;
    z-index: 5;
    background: none;
    font-family: inherit;
    @media (max-width: 768px) {
      width: 75vw;
    }
  }
`;

export const InputWrapper = styled.div`
  width: 400px;
  position: relative;
  margin: 5px;
  @media (max-width: 768px) {
    width: 80vw;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #999;
    font-size: 16px;
    position: relative;
    z-index: 5;
    background: none;
    @media (max-width: 768px) {
      width: 75vw;
    }
  }
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;

export const Banner = styled.img`
  width: 80%;
  height: auto;
  max-width: 90%;
`;
