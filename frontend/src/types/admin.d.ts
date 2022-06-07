import { IPaginationData } from './page';

export interface IOrderInfo {
  id: string;
  orderStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalAmount: number;
}
export interface IOrdersInfo extends IPaginationData {
  content: IOrderInfo[];
}

export interface IHourRevenueData {
  hour: string;
  total: string;
}

export interface IDailyRevenueData {
  date: string;
  total: string;
}

export interface IMonthlyRevenueData {
  month: string;
  total: string;
}

export interface ITodayHighlightData {
  revenue: number;
  revenueChange: number | null;
  numberOfOrder: number;
  numberOfOrderChange: number | null;
  numberOfUnfulfilledOrder: number;
}
