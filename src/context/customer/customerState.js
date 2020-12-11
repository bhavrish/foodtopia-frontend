import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { RECOMMENDED_DISHES, GET_REVIEWS, POST_REVIEW, DISPUTE_REVIEW } from '../types';
import { responsiveFontSizes } from '@material-ui/core';

const CustomerState = (props) => {
  const initialState = {
    recommendedDishes: [],
    reviews:[],
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
    } catch (error){
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
      const data = new FormData();
      data.append('type', formData.type);
      data.append('reviewTo', formData.reviewTo);
      data.append('review', formData.review);
      data.append('starRating', formData.starRating);
      
      const res = await axios.post(
        `http://localhost:5000/api/reviews`,
        formData,
        config
      );
      console.log(res.data);
      console.log(formData);

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

  const customerDisputeReview = async (reviewID) => {
    try{
      const res = await axios.patch(
        `http://localhost:5000/api/reviews/needToHandle/${reviewID}`,
      );

      res.data.needToBeHandled = true;

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

  return (
    <CustomerContext.Provider
      value={{
        recommendedDishes: state.recommendedDishes,
        reviews: state.reviews,
        getRecommendedDishes,
        getReviews,
        postReview,
        customerDisputeReview,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
