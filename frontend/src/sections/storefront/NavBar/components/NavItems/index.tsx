import { useContext } from 'react';
import { PageContext } from '../../../../../Context';
import { NavItemsContainer, StyledLink } from './styles';

export const NavItems = () => {
  const { page, setPage } = useContext(PageContext);
  return (
    <NavItemsContainer>
      <StyledLink
        to="/categories/deck"
        onClick={() => {
          setPage(1);
        }}
      >
        Decks
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/wheel"
      >
        Wheels
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/bearing"
      >
        Bearings
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/hardware"
      >
        Hardwares
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/truck"
      >
        Trucks
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/grip-tape"
      >
        Grip Tapes
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/categories/apparel"
      >
        Apparel
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/products"
      >
        All Products
      </StyledLink>
      <StyledLink
        onClick={() => {
          setPage(1);
        }}
        to="/skateboardBuilder"
      >
        Build Your Skateboard!
      </StyledLink>
    </NavItemsContainer>
  );
};
