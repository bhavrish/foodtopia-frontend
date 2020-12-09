import { GET_PENDING_CUSTOMERS, GET_PENDING_EMPLOYEES, GET_PENDING_ERROR, CLEAR_ERRORS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PENDING_CUSTOMERS:
      return {
        ...state,
        pendingCustomers: action.payload,
        loading: false,
      };
    
    case GET_PENDING_EMPLOYEES:
      return {
        ...state,
        pendingEmployees: action.payload,
        loading: false,
      };

    case GET_PENDING_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      break;
  }
};
