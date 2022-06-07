import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LoadingSpinner,
  FormContainer,
  Button,
} from '../../../../shared/UI/SharedUI';
import { useGetOrderDetail, usePutOrder } from '../../../../../api/APIService';
import { IOrderRecordDetailData } from '../../../../../types/customer';

export const Container = styled.div`
  padding: 5px 20px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const OrderInfo = () => {
  const { id } = useParams();
  const {
    loading,
    data: orderDetailData,
    error,
  } = useGetOrderDetail(id as string);
  const {
    fetchData,
    loading: putLoading,
    data: putOrderDetailData,
    error: putError,
  } = usePutOrder(id as string);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [addressArea, setAddressAreas] = useState<string>('');
  const [addressDistrict, setAddressDistrict] = useState<string>('');
  const [putRequest, setPutRequest] = useState<IOrderRecordDetailData>();

  useEffect(() => {
    if (orderDetailData) {
      if (orderDetailData.shippingAddress) {
        setAddressLine(orderDetailData.shippingAddress.line);
        setAddressAreas(orderDetailData.shippingAddress.area);
        setAddressDistrict(orderDetailData.shippingAddress.district);
      }
      setOrderStatus(orderDetailData.orderStatus);
      setPaymentStatus(orderDetailData.paymentStatus);
      setDeliveryStatus(orderDetailData.deliveryStatus);
      setPutRequest(orderDetailData);
    }
  }, [orderDetailData]);

  useEffect(() => {
    const putRequestUpdate = { ...putRequest } as IOrderRecordDetailData;
    putRequestUpdate.deliveryStatus = deliveryStatus;
    putRequestUpdate.paymentStatus = paymentStatus;
    putRequestUpdate.orderStatus = orderStatus;
    putRequestUpdate.shippingAddress = {
      area: addressArea,
      district: addressDistrict,
      line: addressLine,
    };
    setPutRequest(putRequestUpdate);
  }, [
    addressLine,
    addressArea,
    addressDistrict,
    orderStatus,
    paymentStatus,
    deliveryStatus,
  ]);

  if (loading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  return (
    <FormContainer>
      <Link to="/admin/orders"> ← Back to Order List</Link>
      {orderDetailData && (
        <>
          <h2>Order #{orderDetailData.id}</h2>
          <p>Ordered at {orderDetailData.createDateTime}</p>
          <p>Order Status:</p>
          <select
            name="orderStatus"
            id="orderStatus"
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
            }}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <p>Payment Status: </p>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
            }}
          >
            <option value="PENDING">PENDING</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="REFUND">REFUND</option>
          </select>
          <p>Delivery Status: </p>
          <select
            name="deliveryStatus"
            id="deliveryStatus"
            value={deliveryStatus}
            onChange={(e) => {
              setDeliveryStatus(e.target.value);
            }}
          >
            <option value="ONHOLD">ONHOLD</option>
            <option value="PREPARING">PREPARING</option>
            <option value="DELIVERING">DELIVERING</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
          <p>Shipping Address: </p>
          <span>
            Area:
            <input
              type="text"
              value={addressArea}
              onChange={(e) => setAddressAreas(e.target.value)}
            />
          </span>
          <span>
            District:
            <input
              type="text"
              value={addressDistrict}
              onChange={(e) => setAddressDistrict(e.target.value)}
            />
          </span>
          <span>
            Line:
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
            />
          </span>
          <p>Order Item(s)</p>
          {orderDetailData.orderItems.map((orderItem, index) => (
            <p key={index}>
              <span>{orderItem.variant.productName} </span>
              {orderItem.variant.optionValues.map((optionValue, oVindex) => (
                <span key={oVindex}>{optionValue.name}</span>
              ))}
              <br />
              <span>Unit Price: ${orderItem.variant.price} </span>
              <span>Quantity: {orderItem.quantity}</span>
            </p>
          ))}
        </>
      )}
      <Button
        type="submit"
        onClick={() => {
          if (putRequest) fetchData(id as string, {}, putRequest);
        }}
      >
        Save Change
      </Button>
    </FormContainer>
  );
};
