import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 500px;
  margin: 65px auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Input = styled.input`
  font-size: 16px;
  display: block;
  width: 100%;
  padding: 10px 1px;
  border: 0;
  border-bottom: 1px solid #747474;
  outline: none;
`;

export const InputWrapper = styled.div`
  margin: 10px 0px;
`;
