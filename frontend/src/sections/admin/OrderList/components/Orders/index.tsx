import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useGetOrders } from '../../../../../api/APIService';
import {
  ButtonContainer,
  HeaderContainer,
  Column,
  LoadingSpinner,
  MobileTag,
} from '../../../../shared/UI/SharedUI';
import { PageContext } from '../../../../../Context';
import { Pagination } from '../../../../shared/components';
import { IOrderInfo } from '../../../../../types/admin';

const Container = styled.div`
  margin: auto;
`;

export const Orders = () => {
  const { page, setPage } = useContext(PageContext);
  const [totalPages, settotalPages] = useState<number>();
  const [orders, setOrders] = useState<IOrderInfo[]>([]);

  const { fetchData, loading, data: ordersData, error } = useGetOrders(page);

  useEffect(() => {
    fetchData('', { page }, {});
  }, [page]);

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData.content);
      settotalPages(ordersData.totalPages);
    }
  }, [ordersData]);

  if (loading) return <LoadingSpinner />;
  return (
    <Container>
      <HeaderContainer>
        <Column>
          <h4>Order Id</h4>
        </Column>
        <Column>
          <h4>Order Status</h4>
        </Column>
        <Column>
          <h4>Payment Status</h4>
        </Column>
        <Column>
          <h4>Delivery Status</h4>
        </Column>
        <Column>
          <h4>Total Amount</h4>
        </Column>
      </HeaderContainer>
      {orders &&
        orders.map((order) => (
          <Link
            to={`/admin/order/${order.id}`}
            state={{ order }}
            key={order.id}
          >
            <ButtonContainer key={order.id}>
              <Column>
                <MobileTag>Id - </MobileTag>
                <span>#{order.id}</span>
              </Column>
              <Column>
                <MobileTag>Status - </MobileTag>
                <span>{order.orderStatus}</span>
              </Column>
              <Column>
                <MobileTag>Payment - </MobileTag>
                <span>{order.paymentStatus}</span>
              </Column>
              <Column>
                <MobileTag>Delivery - </MobileTag>
                <span>{order.deliveryStatus}</span>
              </Column>
              <Column>
                <MobileTag>Total Amount - </MobileTag>
                <span>${order.totalAmount}</span>
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
