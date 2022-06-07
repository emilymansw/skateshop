import { signOut } from 'firebase/auth';
import { clearCurrentUser } from '../../../redux/userSlice';
import { OrdersHistory } from './components';
import { auth } from '../../../auth/firebaseUtil';
import { Container } from '../../shared/UI/SharedUI';
import { useAppDispatch } from '../../../redux/hook';

export const CustomerInfo = () => {
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
  return (
    <Container>
      <button
        type="submit"
        onClick={() => {
          firebaseSignOut();
        }}
      >
        logout
      </button>
      <OrdersHistory />
    </Container>
  );
};
