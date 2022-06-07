import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from '../../../redux/hook';
import { auth } from '../../../auth/firebaseUtil';
import { clearCurrentUser } from '../../../redux/userSlice';

interface PropType {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: PropType) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  const firebaseSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearCurrentUser());
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };
  if (role !== 'admin') {
    firebaseSignOut();
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
