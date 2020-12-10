import React, { useReducer } from 'react';
import axios from 'axios';
import ManagerContext from './managerContext';
import ManagerReducer from './managerReducer';
import { GET_PENDING_CUSTOMERS, GET_PENDING_EMPLOYEES, GET_REVIEWS, CUSTOMER_SUCCESS, EMPLOYEE_SUCCESS, REVIEW_SUCCESS, API_ERROR, CLEAR_ERRORS } from '../types';

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

  // get pending reviews
  const getReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manager/reviews/pending');

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

  // ban customer
  const banCustomer = async customerID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const customerObj = await axios.get(`http://localhost:5000/api/customers/${customerID}`);
      const email = customerObj.data.email;

      const res = await axios.post(
        `http://localhost:5000/api/blacklist`,
        {
            email,
        },
        config
      );

      const res2 = await axios.delete(
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

  // ban employee
  const banEmployee = async employeeID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const employeeObj = await axios.get(`http://localhost:5000/api/employees/${employeeID}`);
      const email = employeeObj.data.email;

      const res = await axios.post(
        `http://localhost:5000/api/blacklist`,
        {
            email,
        },
        config
      );

      const res2 = await axios.delete(
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

  // approve review
  const approveReview = async reviewID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/manager/reviewWithMerit/${reviewID}`,
        config
      );

      dispatch({
        type: REVIEW_SUCCESS,
        payload: reviewID,
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

  // dismiss review
  const dismissReview = async reviewID => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/manager/reviewWithoutMerit/${reviewID}`,
        config
      );

      dispatch({
        type: REVIEW_SUCCESS,
        payload: reviewID,
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
        banCustomer,
        banEmployee,
        approveReview,
        dismissReview,
        clearErrors,
      }}
    >
      {props.children}
    </ManagerContext.Provider>
  );
};

export default ManagerState;
