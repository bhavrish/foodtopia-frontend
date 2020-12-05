import React, { useReducer } from 'react';
import * as axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  SIGNIN_SUCCESS,
  SIGN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  SIGNOUT,
  SIGNOUT_FAIL,
  AUTH_ERROR,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('http://localhost:5000/api/auth/signin');

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Sign In User
  const signin = async (email, password, userType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/signin?role=${userType}`,
        {
          email,
          password,
        },
        config
      );

      console.log(res.data);

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      console.log(error);
    }
  };

  // signout user
  const signout = () => dispatch({ type: SIGNOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        signin,
        signout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
