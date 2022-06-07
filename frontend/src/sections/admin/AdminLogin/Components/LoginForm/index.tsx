import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../../../../redux/userSlice';
import { auth } from '../../../../../auth/firebaseUtil';
import { LoginButton } from '../../../../shared/UI/SharedUI';
import { useAppDispatch } from '../../../../../redux/hook';
import { FormWrapper, InputWrapper, Input } from './styles';
import { useGetUserRole } from '../../../../../api/APIService';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchData, data } = useGetUserRole();
  const [userRole, setUserRole] = useState<string | undefined | null>();
  const [accessError, setAccessError] = useState<string | undefined>();

  const submitCredentials = (event: React.SyntheticEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(({ user }) => {
        if (user) {
          fetchData(user.uid, {}, {});
        }
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (data) {
      if (data === 'admin') {
        setUserRole('admin');
      } else if (data === 'customer') {
        setUserRole('customer');
      }
    }
  }, [data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email && userRole === 'admin') {
          dispatch(
            setCurrentUser({
              userEmail: user.email,
              role: userRole,
            })
          );
          navigate('/admin');
        } else {
          setAccessError(
            'Email not matched with admin account. Access forbidden.'
          );
        }
      }
    });
  }, [userRole]);

  return (
    <FormWrapper>
      <form onSubmit={submitCredentials}>
        <h1>Admin Login</h1>
        <InputWrapper>
          <Input
            type="text"
            placeholder="email"
            value={credentials.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            type="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
            name="password"
          />
        </InputWrapper>
        <LoginButton type="submit" name="login">
          Login
        </LoginButton>
        <p>{accessError}</p>
      </form>
    </FormWrapper>
  );
};
