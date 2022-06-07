import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

export const SideBarContainer = styled.header`
  width: 100%;
  height: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 0px 6px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: white;
  @media (max-width: 768px) {
    position: absolute;
    z-index: 7;
    width: 40vw;
    top: 0;
    left: 0;
  }
`;

export const Logo = styled.img`
  width: 10vw;
  height: auto;
  contain: object-fit;
  @media (max-width: 768px) {
    width: 20vw;
  }
`;

export const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const StyledGiHamburgerMenu = styled(GiHamburgerMenu)`
  position: absolute;
  top: 5px;
  left: 5px;
`;
