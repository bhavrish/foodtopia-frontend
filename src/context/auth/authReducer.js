import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  SIGNOUT,
  SIGNOUT_FAIL,
  AUTH_ERROR,
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
    default:
      break;
  }
};
