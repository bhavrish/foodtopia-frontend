import React, { useReducer } from 'react';
import axios from 'axios';
import DeliveryContext from './deliveryContext';
import DeliveryReducer from './deliveryReducer';
import { GET_ORDERS, DELIVER_SUCCESS, GET_REVIEWS, DISPUTE_REVIEW, POST_REVIEW } from '../types';

const DeliveryState = (props) => {
  const initialState = {
    orders: [],
    reviews: [],
    error: null,
  };

  const [state, dispatch] = useReducer(DeliveryReducer, initialState);

  const getOrders = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const type = 'delivery';

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders?type=${type}`,
        config
      );
            
      for (const order of res.data) {
        const menuItemID = order.menuItem;
        const menuItemDetails = await axios.get(`http://localhost:5000/api/menuItems/${menuItemID}`);

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

  const deliverOrder = async (orderData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const orderID = orderData.orderID;
    const deliveryID = orderData.deliveryID;
    console.log(orderID);
    console.log(deliveryID);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/deliver/${orderID}`,
        {
          deliveryID,
        },
        config
      );

      dispatch({
        type: DELIVER_SUCCESS,
        payload: orderID,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  // get reviews
  const getReviews = async (chefID) => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/reviews?reviewTo=${chefID}`  
      );

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });
    } catch (error){
      console.log(error);
    }
  };

  const deliveryDisputeReview = async (reviewID) => {
    try{
      const review = await axios.patch(`http://localhost:5000/api/reviews/needToHandle/${reviewID}`);
      
      review.data.needToBeHandled = true;

      dispatch({
        type: DISPUTE_REVIEW,
        payload: reviewID,
      });
    } catch (error) {
      console.log(error);
    }
  };

    // post review
    const postReview = async (formData) => {
    try{
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

     /* const data = new FormData();
      data.append('type', formData.type);
      data.append('reviewTo', formData.reviewTo);
      data.append('review', formData.review);
      data.append('starRating', formData.starRating);
  */
      const res = await axios.post(
        `http://localhost:5000/api/reviews`,
        formData,
        config
      );

      console.log(res.data);

      dispatch({
        type: POST_REVIEW,
        payload: {
          reviews: res.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <DeliveryContext.Provider
      value={{
        orders: state.orders,
        reviews: state.reviews,
        error: state.error,
        getOrders,
        deliverOrder,
        getReviews,
        deliveryDisputeReview,
        postReview,
      }}
    >
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryState;
