/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from './sections/storefront/Home';
import { Product } from './sections/storefront/Product';
import { PageContext } from './Context';
import { GlobalStyle } from './globalStyles';
import { NavBar } from './sections/storefront/NavBar';
import { Cart } from './sections/storefront/Cart';
import { Login } from './sections/storefront/Login';
import { Checkout } from './sections/storefront/Checkout';
import { EditProduct } from './sections/admin/EditProduct';
import { CustomerInfo } from './sections/storefront/CustomerInfo';
import { CreateProduct } from './sections/admin/CreateProduct';
import { BrandList } from './sections/admin/BrandList';
import { EditBrand } from './sections/admin/EditBrand';
import { OrderDetail } from './sections/storefront/CustomerInfo/components';
import { AdminLogin } from './sections/admin/AdminLogin';
import { ProductsList } from './sections/admin/ProductsList';
import { Dashboard } from './sections/admin/Dashboard';
import { Sidebar } from './sections/admin/Sidebar/index';
import { CustomerList } from './sections/admin/CustomerList';
import { CustomerRecord } from './sections/admin/CustomerList/Components/CustomerRecord';
import { OrderList } from './sections/admin/OrderList';
import { OrderInfo } from './sections/admin/OrderList/components';
import { SkateboardBuilder } from './sections/storefront/SkateboardBuilder';
import { CreateBrand } from './sections/admin/CreateBrand';
import {
  AllProductsList,
  CatProductList,
  SearchProductList,
} from './sections/storefront/Products';
import { Brand } from './sections/storefront/Brand';
import { useAppSelector } from './redux/hook';
import { ProtectedRoute } from './sections/admin/ProtectedRoute';
import { NotFound } from './sections/shared/components/NotFound';

const Grid = styled.div`
  margin: 0;
  background-color: #f8f8fb;
  display: grid;
  grid-template-columns: 15vw 7fr;
  width: 100vw;
  min-height: 100vh;
  @media (max-width: 768px) {
    display: block;
  }
`;
const NavBarWrapper = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const SidebarWrapper = () => (
  <Grid>
    <Sidebar />
    <Outlet />
  </Grid>
);

const App = () => {
  const [page, setPage] = useState<number>(1);
  const { userEmail } = useAppSelector((state) => state.user);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <GlobalStyle />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<NavBarWrapper />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/categories/:categorySlug"
            element={<CatProductList />}
          />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/brands/:brandSlug" element={<Brand />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<AllProductsList />} />
          <Route path="/products/search" element={<SearchProductList />} />

          <Route
            path="/account"
            element={!userEmail ? <Navigate to="/login" /> : <CustomerInfo />}
          />
          <Route path="/account/order/:id/" element={<OrderDetail />} />
          <Route path="/skateboardBuilder" element={<SkateboardBuilder />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SidebarWrapper />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/product/:slug" element={<EditProduct />} />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/customers" element={<CustomerList />} />
          <Route path="/admin/customer/:id" element={<CustomerRecord />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<OrderInfo />} />
          <Route path="/admin/createProduct" element={<CreateProduct />} />
          <Route path="/admin/brands" element={<BrandList />} />
          <Route path="/admin/brand/:slug" element={<EditBrand />} />
          <Route path="/admin/createBrand" element={<CreateBrand />} />
        </Route>
      </Routes>
    </PageContext.Provider>
  );
};

export default App;
