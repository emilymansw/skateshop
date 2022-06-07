import { useAxios } from './useAxios';
import {
  IProductData,
  IProductsData,
  IOptionFamilyData,
  ICategoryData,
} from '../types/product';
import {
  IOrdersInfo,
  IHourRevenueData,
  IDailyRevenueData,
  IMonthlyRevenueData,
  ITodayHighlightData,
} from '../types/admin';
import {
  ICustomerInfoData,
  ICustomerOrderData,
  IOrderRecordDetailData,
  ICustomersInfoData,
} from '../types/customer';
import { IBrandData } from '../types/brand';

const baseURL = process.env.REACT_APP_PRO_BACKEND_BASEURL;

const PRODUCT_API_URL = `${baseURL}/product/`;
const LIVE_PRODUCTS_API_URL = `${baseURL}/products`;
const CATEGORIES_API_URL = `${baseURL}/categories`;
const BRANDS_API_URL = `${baseURL}/brands`;
const OPTIONFAMILIES_API_URL = `${baseURL}/optionFamilies`;
const CATEGORY_PRODUCT_API_URL = `${baseURL}/products/category/`;
const BRAND_API_URL = `${baseURL}/brand/`;
const BRAND_PRODUCT_API_URL = `${baseURL}/products/brand/`;
const SEARCH_PRODUCTS_API_URL = `${baseURL}/search`;
const CUSTOMER_API_URL = `${baseURL}/customer`;
const CUSTOMER_ORDER_API_URL = `${baseURL}/customer/order/`;
const ORDER_DETAIL_API_URL = `${baseURL}/order/`;
const RENDER_API_URL = `${baseURL}/renderImg`;
const USER_ROLE_API_URL = `${baseURL}/user/role/`;

const ADMIN_PRODUCTS_API_URL = `${baseURL}/admin/products`;
const ADMIN_PRODUCT_API_URL = `${baseURL}/admin/product/`;
const ADMIN_REVENUE_BY_MONTH_API_URL = `${baseURL}/admin/thisYearRevenue`;
const ADMIN_REVENUE_BY_DATE_API_URL = `${baseURL}/admin/thisMonthRevenue`;
const ADMIN_REVENUE_BY_HOUR_API_URL = `${baseURL}/admin/todayRevenue`;
const ADMIN_CUSTOMERS_API_URL = `${baseURL}/admin/customers`;
const ADMIN_ORDERS_API_URL = `${baseURL}/admin/orders`;
const ADMIN_TODAY_HIGHLIGHT_API_URL = `${baseURL}/admin/todayHighlight`;
const ADMIN_ORDER_API_URL = `${baseURL}/admin/order/`;
const ADMIN_BRAND_API_URL = `${baseURL}/admin/brand/`;
const ADMIN_OPTIONFAMILIES_API_URL = `${baseURL}/admin/optionFamilies/`;

export function usePutProduct(slug: string) {
  const { fetchData, data, error, loading } = useAxios<IProductData>(
    'PUT',
    ADMIN_PRODUCT_API_URL,
    slug,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePutOrder(id: string) {
  const { fetchData, data, error, loading } = useAxios<IOrderRecordDetailData>(
    'PUT',
    ADMIN_ORDER_API_URL,
    id,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePutBrand(id: string) {
  const { fetchData, data, error, loading } = useAxios<IBrandData>(
    'PUT',
    ADMIN_BRAND_API_URL,
    id,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePostBrand() {
  const { fetchData, data, error, loading } = useAxios<IBrandData>(
    'POST',
    ADMIN_BRAND_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePostOptionFamily() {
  const { fetchData, data, error, loading } = useAxios<IBrandData>(
    'POST',
    ADMIN_OPTIONFAMILIES_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetProductsUnderCat(category: string, page: number) {
  const { fetchData, data, error, loading } = useAxios<IProductsData>(
    'GET',
    CATEGORY_PRODUCT_API_URL,
    category,
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetProductsUnderBrand(brandName: string, page: number) {
  const { fetchData, data, error, loading } = useAxios<IProductsData>(
    'GET',
    BRAND_PRODUCT_API_URL,
    brandName,
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePostNewOption() {
  const { fetchData, data, error, loading } = useAxios(
    'POST',
    ADMIN_OPTIONFAMILIES_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePostNewProduct() {
  const { fetchData, data, error, loading } = useAxios<IProductData>(
    'POST',
    ADMIN_PRODUCT_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetSearchResult(searchParam: string, page: number) {
  const { fetchData, data, error, loading } = useAxios<IProductsData>(
    'GET',
    SEARCH_PRODUCTS_API_URL,
    '',
    { q: searchParam, page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetCustomerOrder(id: string) {
  const { fetchData, data, error, loading } = useAxios<ICustomerOrderData>(
    'GET',
    CUSTOMER_ORDER_API_URL,
    id,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetCustomerInfo() {
  const { fetchData, data, error, loading } = useAxios<ICustomerInfoData>(
    'GET',
    CUSTOMER_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetRenderImg() {
  const { fetchData, data, error, loading } = useAxios<string>(
    'GET',
    RENDER_API_URL,
    '',
    {},
    {},
    false
  );
  return { fetchData, data, error, loading };
}

export function useGetLiveProducts(page: number) {
  const { fetchData, data, error, loading } = useAxios<IProductsData>(
    'GET',
    LIVE_PRODUCTS_API_URL,
    '',
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetProducts(page: number) {
  const { fetchData, data, error, loading } = useAxios<IProductsData>(
    'GET',
    ADMIN_PRODUCTS_API_URL,
    '',
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetProduct(slug: string) {
  const { fetchData, data, error, loading } = useAxios<IProductData>(
    'GET',
    PRODUCT_API_URL,
    slug,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function usePatchProduct() {
  const { fetchData, data, error, loading } = useAxios<IProductData>(
    'PATCH',
    ADMIN_PRODUCT_API_URL,
    '',
    {},
    {},
    false
  );
  return { fetchData, data, error, loading };
}

export function useGetCategories() {
  const { fetchData, data, error, loading } = useAxios<ICategoryData[]>(
    'GET',
    CATEGORIES_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetBrands() {
  const { fetchData, data, error, loading } = useAxios<IBrandData[]>(
    'GET',
    BRANDS_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetBrand(slug: string) {
  const { fetchData, data, error, loading } = useAxios<IBrandData>(
    'GET',
    BRAND_API_URL,
    slug,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetOptionFamilies() {
  const { fetchData, data, error, loading } = useAxios<IOptionFamilyData[]>(
    'GET',
    OPTIONFAMILIES_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetMonthlyRevenue() {
  const { fetchData, data, error, loading } = useAxios<IMonthlyRevenueData[]>(
    'GET',
    ADMIN_REVENUE_BY_MONTH_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetDailyRevenue() {
  const { fetchData, data, error, loading } = useAxios<IDailyRevenueData[]>(
    'GET',
    ADMIN_REVENUE_BY_DATE_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetHourlyRevenue() {
  const { fetchData, data, error, loading } = useAxios<IHourRevenueData[]>(
    'GET',
    ADMIN_REVENUE_BY_HOUR_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetUserRole() {
  const { fetchData, data, error, loading } = useAxios<string>(
    'GET',
    USER_ROLE_API_URL,
    '',
    {},
    {},
    false
  );
  return { fetchData, data, error, loading };
}

export function useGetCustomers(page: number) {
  const { fetchData, data, error, loading } = useAxios<ICustomersInfoData>(
    'GET',
    ADMIN_CUSTOMERS_API_URL,
    '',
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetOrders(page: number) {
  const { fetchData, data, error, loading } = useAxios<IOrdersInfo>(
    'GET',
    ADMIN_ORDERS_API_URL,
    '',
    { page },
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetOrderDetail(id: string) {
  const { fetchData, data, error, loading } = useAxios<IOrderRecordDetailData>(
    'GET',
    ORDER_DETAIL_API_URL,
    id,
    {},
    {}
  );
  return { fetchData, data, error, loading };
}

export function useGetTodayHighlight() {
  const { fetchData, data, error, loading } = useAxios<ITodayHighlightData>(
    'GET',
    ADMIN_TODAY_HIGHLIGHT_API_URL,
    '',
    {},
    {}
  );
  return { fetchData, data, error, loading };
}
