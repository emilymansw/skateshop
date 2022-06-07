import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useGetCustomers } from '../../../../../api/APIService';
import {
  LoadingSpinner,
  ButtonContainer,
  Column,
  LargeColumn,
  HeaderContainer,
  MobileTag,
} from '../../../../shared/UI/SharedUI';
import { Container } from './styles';
import { ICustomerInfoData } from '../../../../../types/customer';
import { PageContext } from '../../../../../Context';
import { Pagination } from '../../../../shared/components';

export const Customers = () => {
  const { page, setPage } = useContext(PageContext);
  const {
    fetchData,
    loading,
    data: customersData,
    error,
  } = useGetCustomers(page);
  const [totalPages, setTotalPage] = useState<number>();
  const [customers, setCustomers] = useState<ICustomerInfoData[]>([]);

  useEffect(() => {
    fetchData('', { page }, {});
  }, [page]);

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData.content);
      setTotalPage(customersData.totalPages);
    }
  }, [customersData]);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <HeaderContainer>
        <Column>
          <h4>Customer Name</h4>
        </Column>
        <LargeColumn>
          <h4>Customer Email</h4>
        </LargeColumn>
        <Column>
          <h4>Number of Orders</h4>
        </Column>
        <Column>
          <h4>Total Order Amount</h4>
        </Column>
      </HeaderContainer>
      {customers &&
        customers.map((customer) => (
          <Link
            to={`/admin/customer/${customer.id}`}
            state={{ customer }}
            key={customer.id}
          >
            <ButtonContainer key={customer.id}>
              <Column>
                <MobileTag>Name -</MobileTag>
                {customer.name}
              </Column>
              <LargeColumn>
                <MobileTag>Email -</MobileTag>
                {customer.email}
              </LargeColumn>
              <Column>
                <MobileTag>Number of Order -</MobileTag>
                {customer.orderRecords.length}
              </Column>
              <Column>
                <MobileTag>Total Order Amount -</MobileTag>
                {customer.orderRecords.reduce(
                  (prev, curr) => prev + curr.totalAmount,
                  0
                )}
              </Column>
            </ButtonContainer>
          </Link>
        ))}
      {totalPages && totalPages > 1 && (
        <Pagination totalPages={totalPages} setPage={setPage} page={page} />
      )}
    </Container>
  );
};
