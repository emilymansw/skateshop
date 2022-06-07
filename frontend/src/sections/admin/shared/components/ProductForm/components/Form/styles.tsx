import styled from 'styled-components';

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
`;
