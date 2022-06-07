import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItemsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 5px auto;
  height: 25px;
  @media (max-width: 768px) {
    justify-content: start;
    width: 95%;
    overflow: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledLink = styled(NavLink)`
  display: inline-block;
  white-space: nowrap;
  margin: 5px;
  &:hover {
    color: grey;
  }
  &.active {
    color: grey;
    font-weight: bold;
  }
`;
