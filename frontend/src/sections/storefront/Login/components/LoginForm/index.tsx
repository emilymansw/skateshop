import React, { useState, useEffect } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../../../../redux/userSlice';
import { auth } from '../../../../../auth/firebaseUtil';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import {
  FormWrapper,
  Input,
  InputWrapper,
  GoogleButton,
  LoginButton,
} from './styles';
import { useGetUserRole } from '../../../../../api/APIService';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userEmail } = useAppSelector((state) => state.user);
  const [userRole, setUserRole] = useState<string | undefined | null>();
  const { fetchData, data } = useGetUserRole();

  const signInWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (user) {
          fetchData(user.uid, {}, {});
        }
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  const registerWithEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (user) {
          fetchData(user.uid, {}, {});
        }
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        if (user) {
          fetchData(user.uid, {}, {});
        }
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  const submitCredentials = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { submitter } = event.nativeEvent as SubmitEvent;
    if (submitter) {
      if (submitter.textContent === 'Login') {
        signInWithEmail(credentials.email, credentials.password);
      } else if (submitter.textContent === 'Register') {
        registerWithEmail(credentials.email, credentials.password);
      }
    }
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
        if (user.email && userRole === 'customer') {
          dispatch(
            setCurrentUser({
              userEmail: user.email,
              role: userRole,
            })
          );
          navigate(-1);
        }
      }
    });
  }, [userRole]);

  useEffect(() => {
    if (userEmail) {
      navigate(-1);
    }
  }, [userEmail]);

  return (
    <FormWrapper>
      {userEmail ? (
        <p>You have login as {userEmail}</p>
      ) : (
        <>
          <form onSubmit={submitCredentials}>
            <h1>Login/Register</h1>
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
            <LoginButton type="submit" name="register">
              Register
            </LoginButton>
          </form>
          <GoogleButton onClick={signInWithGoogle}>
            Sign in with Google
          </GoogleButton>
        </>
      )}
    </FormWrapper>
  );
};
