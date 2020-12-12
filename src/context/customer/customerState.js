import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import {
  RECOMMENDED_DISHES,
  ITEM_IN_CART,
  PLACE_ORDER,
  INSUFFICIENT_BALANCE,
  NEW_BALANCE,
  CLEAR_ERRORS,
  DISCUSSION_POSTS_SUCCESS,
  GET_REVIEWS,
  POST_REVIEW,
  DISPUTE_REVIEW,
  GET_ORDERS,
} from '../types';

const CustomerState = (props) => {
  const initialState = {
    recommendedDishes: [],
    reviews: [],
    itemsInCart: [],
    newBalance: null,
    discussionPosts: [],
    error: null,
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const getRecommendedDishes = async (customerID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/menuItems/topThreeForYou/${customerID}`
      );

      const recommendedDishes = [];

      for (const menuItemId of res.data) {
        const recommendedDish = await axios.get(
          `http://localhost:5000/api/menuItems/${menuItemId}`
        );

        recommendedDishes.push(recommendedDish.data);
      }

      dispatch({
        type: RECOMMENDED_DISHES,
        payload: recommendedDishes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get reviews
  const getReviews = async (customerID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews?reviewTo=${customerID}`
      );

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (menuItem) =>
    dispatch({ type: ITEM_IN_CART, payload: menuItem });

  const createOrder = async (order, userBalance) => {
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        menuItemID: order.menuItemID,
        customerID: order.customerID,
        deliveryNeeded: order.deliveryNeeded,
        price: order.price,
      });

      dispatch({
        type: PLACE_ORDER,
        payload: res.data,
      });
    } catch (error) {
      return dispatch({
        type: INSUFFICIENT_BALANCE,
        payload: 'Insufficient balance',
      });
    }
  };

  const addBalance = async (balance, customerId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/customers/balance/${customerId}`,
        {
          amount: parseFloat(balance),
        }
      );

      dispatch({
        type: NEW_BALANCE,
        payload: res.data.balance,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async (customerId) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const type = 'customer';
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders?type=${type}`,
        {
          customerId,
        },
        config
      );
      // console.log(res);
      for (const order of res.data) {
        const menuItemID = order.menuItem;
        const menuItemDetails = await axios.get(
          `http://localhost:5000/api/menuItems/${menuItemID}`
        );
        order.title = menuItemDetails.data.title;
        order.image = menuItemDetails.data.image;
        order.description = menuItemDetails.data.description;
        order.restrictions = menuItemDetails.data.dietaryRestrictions;
      }
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const clearError = () => dispatch({ type: CLEAR_ERRORS });
  // get discussion posts
  const getDiscussionPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/discussions');

      dispatch({
        type: DISCUSSION_POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // post review
  const postReview = async (formData) => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const res = await axios.post(
        `http://localhost:5000/api/reviews`,
        formData,
        config
      );
      console.log(res.data);
      console.log(formData);

      /*dispatch({
        type: POST_REVIEW,
        payload: {
          reviews: res.data,
        },
      });*/
    } catch (error) {
      console.log(error);
    }
  };

  const customerDisputeReview = async (reviewID) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/reviews/needToHandle/${reviewID}`
      );

      dispatch({
        type: DISPUTE_REVIEW,
        payload: {
          reviews: res.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // post to discussion
  const postToDiscussion = async (postData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const message = postData.message;
    const messageFrom = postData.customerID;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/discussions`,
        {
          message,
          messageFrom,
        },
        config
      );

      dispatch({
        type: DISCUSSION_POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  // flag discussion post
  const flagDiscussionPost = async (customerID) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/manager/discussion/${customerID}`,
        config
      );

      dispatch({
        type: DISCUSSION_POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        recommendedDishes: state.recommendedDishes,
        itemsInCart: state.itemsInCart,
        newBalance: state.newBalance,
        error: state.error,
        discussionPosts: state.discussionPosts,
        reviews: state.reviews,
        orders: state.orders,
        getRecommendedDishes,
        getReviews,
        postReview,
        customerDisputeReview,
        addToCart,
        createOrder,
        addBalance,
        clearError,
        getDiscussionPosts,
        postToDiscussion,
        flagDiscussionPost,
        getOrders,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
