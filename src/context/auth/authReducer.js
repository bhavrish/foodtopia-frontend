import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER,
  SIGNOUT,
  SIGNOUT_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS,
  CLEAR_MSG,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        msg: action.payload,
      };

    case SIGNOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case AUTH_ERROR:
    case SIGNIN_FAIL:
    case SIGNOUT_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MSG:
      return {
        ...state,
        msg: null,
      };

    default:
      break;
  }
};
