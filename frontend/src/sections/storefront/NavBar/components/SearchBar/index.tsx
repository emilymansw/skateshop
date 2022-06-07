import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContext } from '../../../../../Context';
import { SearchBox, SearchInput, SearchButton, StyledBiSearch } from './styles';

export const SearchBar = () => {
  const [searchParam, setSearchParam] = useState<string>('');
  const { page, setPage } = useContext(PageContext);

  const navigate = useNavigate();

  const toSearchResult = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate({
      pathname: '/products/search',
      search: `q=${searchParam}`,
    });
    setPage(1);
  };

  return (
    <SearchBox onSubmit={toSearchResult}>
      <SearchInput
        type="text"
        placeholder="What are you looking for?"
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
      />
      <SearchButton type="submit">
        <StyledBiSearch />
      </SearchButton>
    </SearchBox>
  );
};
