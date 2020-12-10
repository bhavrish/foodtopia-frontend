import React, { useReducer } from 'react';
import axios from 'axios';
import ManagerContext from './managerContext';
import ManagerReducer from './managerReducer';
import { GET_PENDING_CUSTOMERS, GET_PENDING_EMPLOYEES, GET_REVIEWS, CUSTOMER_SUCCESS, EMPLOYEE_SUCCESS, API_ERROR, CLEAR_ERRORS } from '../types';

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
        type: API_ERROR,
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
        type: API_ERROR,
        payload: errMsg,
      });
    }
  };

  // get reviews
  const getReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });
    } catch (error) {
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: API_ERROR,
        payload: errMsg,
      });
    }
  };

  // approve customer
  const approveCustomer = async customerID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/manager/approve/${customerID}`,
        config
      );

      dispatch({
        type: CUSTOMER_SUCCESS,
        payload: customerID,
      });
    } catch (error) {
      // if server side crashes than axios request will fail and error.response will be undefined
      // so we shouldn't pass erroor.respoonse.data as property data of undefined cannot be called
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: API_ERROR,
        payload: errMsg,
      });
    }
  };

  // hire employee
  const hireEmployee = async employeeID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/manager/hire/${employeeID}`,
        config
      );

      dispatch({
        type: EMPLOYEE_SUCCESS,
        payload: employeeID,
      });
    } catch (error) {
      // if server side crashes than axios request will fail and error.response will be undefined
      // so we shouldn't pass erroor.respoonse.data as property data of undefined cannot be called
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: API_ERROR,
        payload: errMsg,
      });
    }
  };

  // decline customer
  const declineCustomer = async customerID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/customers/${customerID}`,
        config
      );

      dispatch({
        type: CUSTOMER_SUCCESS,
        payload: customerID,
      });
    } catch (error) {
      // if server side crashes than axios request will fail and error.response will be undefined
      // so we shouldn't pass erroor.respoonse.data as property data of undefined cannot be called
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: API_ERROR,
        payload: errMsg,
      });
    }
  };

  // decline employee
  const declineEmployee = async employeeID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/employees/${employeeID}`,
        config
      );

      dispatch({
        type: EMPLOYEE_SUCCESS,
        payload: employeeID,
      });
    } catch (error) {
      // if server side crashes than axios request will fail and error.response will be undefined
      // so we shouldn't pass erroor.respoonse.data as property data of undefined cannot be called
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: API_ERROR,
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
        getReviews,
        approveCustomer,
        hireEmployee,
        declineCustomer,
        declineEmployee,
        clearErrors,
      }}
    >
      {props.children}
    </ManagerContext.Provider>
  );
};

export default ManagerState;
