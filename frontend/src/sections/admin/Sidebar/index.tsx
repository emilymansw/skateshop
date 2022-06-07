import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { StyledGiHamburgerMenu, SideBarContainer, Close } from './styles';
import { StoreLogo, SmButton } from '../../shared/UI/SharedUI';
import { useAppDispatch } from '../../../redux/hook';
import { auth } from '../../../auth/firebaseUtil';
import { clearCurrentUser } from '../../../redux/userSlice';
import { PageContext } from '../../../Context';

export const Sidebar = () => {
  const { page, setPage } = useContext(PageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useAppDispatch();
  const firebaseSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearCurrentUser());
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    const resizeListener = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <StyledGiHamburgerMenu
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {(isOpen || !isMobile) && (
        <SideBarContainer>
          {isOpen && isMobile && (
            <Close
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </Close>
          )}
          <StoreLogo
            src="https://res.cloudinary.com/drvuz5jme/image/upload/v1653535158/skateshop/Screenshot_2022-05-26_at_11.18.30_AM_b7bxxo.png"
            alt="logo"
          />
          <Link to="/admin" onClick={() => setPage(1)}>
            Dashboard
          </Link>
          <Link to="/admin/orders" onClick={() => setPage(1)}>
            Order
          </Link>
          <Link to="/admin/customers" onClick={() => setPage(1)}>
            Customer
          </Link>
          <Link to="/admin/products" onClick={() => setPage(1)}>
            Product
          </Link>
          <Link to="/admin/brands" onClick={() => setPage(1)}>
            Brand
          </Link>
          <SmButton
            type="submit"
            onClick={() => {
              firebaseSignOut();
            }}
          >
            logout
          </SmButton>
        </SideBarContainer>
      )}
    </>
  );
};
