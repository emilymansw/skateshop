import { IPaginationData } from './page';

export interface IOrderRecordData {
  id: number;
  orderStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalAmount: number;
}

export interface ICustomerInfoData {
  id: number;
  name: string;
  email: string;
  orderRecords: IOrderRecordData[];
}

export interface ICustomersInfoData extends IPaginationData {
  content: ICustomerInfoData[];
}

export interface IShippingAddressData {
  id?: number;
  line: string;
  area: string;
  district: string;
}

export interface IOptionValueNameData {
  name: string;
}

export interface IOrderVariantData {
  id: number;
  price: number;
  productName: string;
  productSlug: string;
  optionValues: IOptionValueNameData[];
}

export interface IOrderItemData {
  variant: IOrderVariantData;
  quantity: number;
}

export interface ICustomerOrderData {
  id: number;
  orderStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  shippingAddress: IShippingAddressData;
  totalAmount: number;
  orderItems: IOrderItemData[];
}

export interface IOrderRecordDetailData extends IOrderRecordData {
  id: number;
  orderStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalAmount: number;
  shippingAddress: IShippingAddressData;
  orderItems: IOrderItemData[];
  createDateTime: string;
}
