import { useParams, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetCustomerOrder } from '../../../../../api/APIService';
import { auth } from '../../../../../auth/firebaseUtil';
import {
  Column,
  Container,
  XLargeColumn,
  LoadingSpinner,
} from '../../../../shared/UI/SharedUI';
import { useAppDispatch } from '../../../../../redux/hook';
import { setCurrentUser } from '../../../../../redux/userSlice';
import { LineItemContainer, OrderContainer } from './styles';
import { NotFound } from '../../../../shared/components/NotFound';

export const OrderDetail = () => {
  const { id } = useParams();
  const {
    fetchData,
    loading,
    data: customerOrderData,
    error,
  } = useGetCustomerOrder(id as string);
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user && !customerOrderData) {
      fetchData(id as string, {}, {});
      if (user.email) {
        dispatch(
          setCurrentUser({
            userEmail: user.email,
            role: 'customer',
          })
        );
      }
    }
  });

  if (loading) return <LoadingSpinner />;
  if (error?.response?.status === 404) return <NotFound />;
  if (customerOrderData)
    return (
      <Container>
        <Link to="/account"> ← Back to Account Info</Link>
        <OrderContainer>
          <h4>Order #{customerOrderData.id}</h4>
          <LineItemContainer>
            <XLargeColumn>
              <h4>Order Item</h4>
            </XLargeColumn>
            <Column>
              <h4>Price</h4>
            </Column>
            <Column>
              <h4>Quantity</h4>
            </Column>
          </LineItemContainer>
          {customerOrderData.orderItems.map((orderItem) => (
            <LineItemContainer>
              <XLargeColumn>
                {orderItem.variant.productName}
                {orderItem.variant.optionValues.map(
                  (optionValue) =>
                    optionValue.name !== 'default' && (
                      <span> - {optionValue.name}</span>
                    )
                )}
              </XLargeColumn>
              <Column>${orderItem.variant.price}</Column>
              <Column>{orderItem.quantity}</Column>
            </LineItemContainer>
          ))}
          <p>Payment: {customerOrderData.paymentStatus}</p>
          <p>Delivery: {customerOrderData.deliveryStatus}</p>
          <p>Total: ${customerOrderData.totalAmount}</p>
          <p>
            Shipping Address: {customerOrderData.shippingAddress?.area}{' '}
            {customerOrderData.shippingAddress?.district}{' '}
            {customerOrderData.shippingAddress?.line}
          </p>
        </OrderContainer>
      </Container>
    );

  return null;
};
