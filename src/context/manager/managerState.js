import React, { useReducer } from 'react';
import axios from 'axios';
import ManagerContext from './managerContext';
import ManagerReducer from './managerReducer';
import { GET_PENDING_CUSTOMERS, GET_PENDING_EMPLOYEES, GET_PENDING_ERROR, CLEAR_ERRORS } from '../types';

const ManagerState = (props) => {
  const initialState = {
    customers: [],
    employees: [],
    reviews: [],
    discussionPosts: [],
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ManagerReducer, initialState);

  // get pending customers
  const getPendingCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manager/customers/pending');

      dispatch({
        type: GET_PENDING_CUSTOMERS,
        payload: res.data,
      });
    } catch (error) {
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: GET_PENDING_ERROR,
        payload: errMsg,
      });
    }
  };

  // get pending employees
  const getPendingEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manager/employees/pending');

      dispatch({
        type: GET_PENDING_EMPLOYEES,
        payload: res.data,
      });
    } catch (error) {
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: GET_PENDING_ERROR,
        payload: errMsg,
      });
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <ManagerContext.Provider
      value={{
        customers: state.customers,
        employees: state.employees,
        reviews: state.reviews,
        discussionPosts: state.discussionPosts,
        error: state.error,
        loading: state.loading,
        getPendingCustomers,
        getPendingEmployees,
        clearErrors,
      }}
    >
      {props.children}
    </ManagerContext.Provider>
  );
};

export default ManagerState;
