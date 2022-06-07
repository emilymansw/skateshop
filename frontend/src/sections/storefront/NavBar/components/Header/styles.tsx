import styled from 'styled-components';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';

export const Wrapper = styled.div`
  display: flex;
  height: 50px;
  margin: 20px 5px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
  padding: 0px 20px;
`;

export const Logo = styled.img`
  width: 10vw;
  height: auto;
  contain: object-fit;
  @media (max-width: 768px) {
    width: 20vw;
  }
`;

export const Box = styled.div`
  margin: 0px 3px;
  display: flex;
`;

export const CartIcon = styled(MdOutlineShoppingCart)`
  height: auto;
  width: 2.25vw;
  margin: 0px 4px;
  @media (max-width: 768px) {
    width: 4.8vw;
  }
`;

export const UserIcon = styled(BiUserCircle)`
  height: auto;
  width: 2.25vw;
  margin: 0px 4px;
  @media (max-width: 768px) {
    width: 4.8vw;
  }
`;

export const CartContainer = styled.div`
  position: relative;
`;

export const Count = styled.span`
  position: absolute;
  top: -5px;
  right: 0;
  z-index: 2;
  font-size: 11px;
  border-radius: 50%;
  background: #d60b28;
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  text-align: center;
  color: white;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 8px;
  }
`;
