import { GET_PENDING_CUSTOMERS, GET_PENDING_EMPLOYEES, GET_REVIEWS, CUSTOMER_SUCCESS, EMPLOYEE_SUCCESS, REVIEW_SUCCESS, API_ERROR, CLEAR_ERRORS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PENDING_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
      };
    
    case GET_PENDING_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    
    case CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        ),
        loading: false
      };

    case EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee._id !== action.payload
        ),
        loading: false
      };

    case REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.filter(
          review => review._id !== action.payload
        ),
        loading: false
      };

    case API_ERROR:
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
