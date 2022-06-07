import styled from 'styled-components';

const Paginator = styled.div`
  margin: 25px auto;
`;
const PageElement = styled.span`
  cursor: pointer;
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  &.active {
    background-color: #0099ff;
    color: white;
    border: 1px solid #0099ff;
  }
`;

export const Pagination = ({
  totalPages,
  setPage,
  page,
}: {
  totalPages: number;
  setPage: (newState: number) => void;
  page: number;
}) => (
  <Paginator>
    <PageElement
      onClick={() => {
        if (page > 1) setPage(page - 1);
      }}
    >
      &laquo;
    </PageElement>
    {Array.from({ length: totalPages }, (_, index) => (
      <PageElement
        key={index}
        className={page - 1 === index ? 'active' : 'inactive'}
        onClick={() => {
          setPage(index + 1);
        }}
      >
        {index + 1}
      </PageElement>
    ))}
    <PageElement
      onClick={() => {
        if (page < totalPages) setPage(page + 1);
      }}
    >
      &raquo;
    </PageElement>
  </Paginator>
);
