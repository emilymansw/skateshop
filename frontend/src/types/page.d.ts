export interface ISortData {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface IPageableData {
  sort: ISortData;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IPaginationData {
  pageable: IPageableData;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: ISortData;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
