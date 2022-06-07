import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const SearchBox = styled.form`
  width: 60%;
  position: relative;
  display: flex;
  @media (max-width: 768px) {
    width: 55%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 2px solid DarkGray;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

export const SearchButton = styled.button`
  height: 34px;
  border: 1px solid DarkGray;
  background: DarkGray;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

export const StyledBiSearch = styled(BiSearch)`
  width: 2.5wh;
  height: auto;
`;
