import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  margin: auto;
  margin-top: 20px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const Container = styled.div`
  padding: 20px;
  margin: 20px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  display: flex;
  background-color: white;
  margin: 10px 0px;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border: none;
  transition: 0.4s ease-in-out;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 5px 0px;
  h4 {
    padding: 7px 0px;
    margin: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Column = styled.div`
  width: 100px;
  margin: 0px 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
  h4 {
    margin: 0px;
    padding: 0px;
  }
`;

export const LargeColumn = styled.div`
  width: 300px;
  margin: 0px 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const XLargeColumn = styled.div`
  width: 600px;
  margin: 0px 5px;
  h4 {
    margin: 0px;
    padding: 0px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MobileTag = styled.span`
  display: none;
  font-weight: strong;
  @media (max-width: 768px) {
    display: inline-block;
    padding-right: 0.2em;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid #515151;
  text-transform: uppercase;
  padding: 12px 50px;
  transition: all 0.3s ease;
  color: #515151;
  margin-bottom: 5px;
  &:hover {
    border: 1px solid #a9a9a9;
    color: #a9a9a9;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  background-color: #ededed;
  border: 1px solid #a9a9a9;
  border-radius: 6px;
  margin: 10px 0px;
  padding: 10px 25px;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  margin-right: 5px;
  &:hover {
    border: 1px solid #a9a9a9;
    color: #e8e8e8;
    cursor: pointer;
    background: none;
  }
`;

export const SmButton = styled.button`
  background-color: #ededed;
  border: 1px solid #a9a9a9;
  border-radius: 6px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 5px 10px;
  transition: all 0.3s ease;
  margin-bottom: 5px;

  &:hover {
    border: 1px solid #a9a9a9;
    color: #e8e8e8;
    cursor: pointer;
    background: none;
  }
`;

export const ButtonContainer = styled.button`
  width: 100%;
  padding: 15px 5px;
  border-radius: 10px;
  display: flex;
  background-color: white;
  margin: 8px 0;
  align-items: center;
  justify-content: space-between;
  border: none;
  transition: 0.4s ease-in-out;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover {
    cursor: pointer;
    border: 1px solid grey;
    padding: 15px 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 70vw;
    margin: auto;
    margin-bottom: 5px;
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid #bbb;
`;

export const FormContainer = styled.div`
  padding: 5px 20px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    width: 80vw;
  }
  textarea {
    height: 4em;
    width: 100%;
    outline: none;
    border: 1px solid #999;
    z-index: 5;
    background: none;
    font-family: inherit;
    border-radius: 6px;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    background: transparent;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    height: 35px;
    margin-bottom: 8px;
    &:focus {
      border: 1px solid #2db92d;
    }
  }

  input {
    margin-bottom: 8px;
  }

  input[type='text'] {
    width: 100%;
    height: 25px;
    background: transparent;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
  }

  input[type='number'] {
    margin-right: 10px;
    margin-left: 5px;
    background: transparent;
    border-radius: 6px;
    border: 1px solid #a9a9a9;
  }

  input[type='file'] {
    display: none;
  }

  span {
    &.file {
      display: inline-block;
      background-color: #ededed;
      border: 1px solid #a9a9a9;
      border-radius: 6px;
      margin: 5px 0px;
      padding: 10px 25px;
      transition: all 0.3s ease;
      font-size: 13.25px;
      &:hover {
        border: 1px solid #a9a9a9;
        color: #e8e8e8;
        cursor: pointer;
        background: none;
      }
    }
  }
`;
export const VariantContainer = styled.div`
  p {
    margin: 0;
  }
  input[type='text'] {
    width: 40px;
    margin-right: 10px;
    height: 20px;
    &.color {
      width: 150px;
    }
  }
  span {
    &.variant {
      margin-right: 5px;
    }
  }
`;

export const StoreLogo = styled.img`
  width: 10vw;
  height: auto;
  contain: object-fit;
  padding: 10px;
  @media (max-width: 768px) {
    width: 25vw;
  }
`;

export const BannerImg = styled.img`
  width: 100%;
`;
