import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f8f8fb;
  margin: auto;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 85%;
  }
`;
export const EarningsCard = styled.div`
  background-color: white;
  margin: 0px 10px;
  width: 12rem;
  border-radius: 1rem;
  transition: 0.4s ease-in-out;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const CardContent = styled.div`
  margin: 0.5rem;
`;

export const EarningsText = styled.h3`
  text-align: center;
  margin: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export const Earning = styled.h1`
  text-align: center;
  margin: 0.5rem;
`;

export const EarningsIncrease = styled.p`
  text-align: center;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.4rem;
  border-radius: 2rem;
  margin: 0.5rem;
`;
