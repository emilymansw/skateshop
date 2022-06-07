import { useLocation, Link } from 'react-router-dom';
import { Container } from './styles';
import {
  ButtonContainer,
  HeaderContainer,
  Column,
  Divider,
} from '../../../../shared/UI/SharedUI';
import { ICustomerInfoData } from '../../../../../types/customer';

interface ILocationStateData {
  customer: ICustomerInfoData;
}

export const CustomerRecord = () => {
  const location = useLocation();
  const { customer } = location.state as ILocationStateData;

  return (
    <Container>
      <Link to="/admin/customers"> ← Back to Customer List</Link>
      <h2>Customer Info</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Number of order: {customer.orderRecords.length}</p>
      <p>
        Total order amount: $
        {customer.orderRecords.reduce(
          (prev, curr) => prev + curr.totalAmount,
          0
        )}
      </p>
      <Divider />
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
      {customer.orderRecords.map((orderRecord, index) => (
        <Link to={`/admin/order/${orderRecord.id}`}>
          <ButtonContainer key={index}>
            <Column>#{orderRecord.id}</Column>
            <Column>{orderRecord.orderStatus}</Column>
            <Column>{orderRecord.paymentStatus}</Column>
            <Column>{orderRecord.deliveryStatus}</Column>
            <Column>${orderRecord.totalAmount}</Column>
          </ButtonContainer>
        </Link>
      ))}
    </Container>
  );
};
