import styled from 'styled-components';

export const LogoWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  img {
    padding: 7px;
    object-fit: contain;
    width: 60px;
    height: auto;
  }
`;
export const TitleContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: start;
  margin: 10px 0px;
`;

export const BrandName = styled.p`
  font-size: 35px;
  font-weight: 500;
  align-self: center;
  padding: 0px 10px;
`;

export const Divider = styled.hr`
  border-top: 1px solid #bbb;
`;
