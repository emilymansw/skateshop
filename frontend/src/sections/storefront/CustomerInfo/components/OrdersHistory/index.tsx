import { Link } from 'react-router-dom';
import { useGetCustomerInfo } from '../../../../../api/APIService';
import {
  ButtonContainer,
  Column,
  LoadingSpinner,
} from '../../../../shared/UI/SharedUI';
import { NotFound } from '../../../../shared/components/NotFound';

export const OrdersHistory = () => {
  const { loading, data: customerData, error } = useGetCustomerInfo();
  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
  if (customerData) {
    return (
      <div>
        <h4>Customer info</h4>
        <p>{customerData.name}</p>
        <p>{customerData.email}</p>
        <br />
        <h4>Order Records</h4>
        {customerData.orderRecords.map((orderRecord) => (
          <Link to={`/account/order/${orderRecord.id}`}>
            <ButtonContainer key={orderRecord.id}>
              <Column>Order #{orderRecord.id}</Column>
              <Column>Payment: {orderRecord.paymentStatus}</Column>
              <Column>Delivery: {orderRecord.deliveryStatus}</Column>
              <Column>Total: ${orderRecord.totalAmount}</Column>
            </ButtonContainer>
          </Link>
        ))}
      </div>
    );
  }
  return null;
};
