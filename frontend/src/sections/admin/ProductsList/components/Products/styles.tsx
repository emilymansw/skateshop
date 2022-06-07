import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Thumbnail = styled.img`
  height: 50px;
  width: auto;
`;
