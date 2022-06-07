import { createContext } from 'react';

interface IPage {
  page: number;
  setPage: (pageState: number) => void;
}

const page: IPage = {
  page: 1,
  setPage: (pageState) => {},
};

export const PageContext = createContext(page);
