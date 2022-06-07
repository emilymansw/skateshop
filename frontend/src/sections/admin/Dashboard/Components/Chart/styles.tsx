import styled from 'styled-components';

export const Container = styled.div`
  width: auto;
  height: 500px;
  padding: 20px;
  padding-bottom: 60px;
  background-color: white;
  margin: 25px 10px;
  border-radius: 1rem;
  transition: 0.4s ease-in-out;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  h4 {
    margin: 0;
  }
  @media (max-width: 768px) {
    height: 280px;
    width: auto;
    max-width: 400px;
  }
`;
