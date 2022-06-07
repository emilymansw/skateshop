import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const BannerImg = styled.img`
  height: auto;
  width: 100%;
`;

export const LogoImg = styled.img`
  width: 80%;
  height: auto;
  @media (max-width: 768px) {
    width: 20%;
  }
`;

export const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
`;
