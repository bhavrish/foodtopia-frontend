import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { RECOMMENDED_DISHES, GET_REVIEWS, POST_REVIEW, DELETE_REVIEW, DISPUTE_REVIEW } from '../types';

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
        `http://localhost:5000/api/reviews/`
      );

      const reviews = [];
      for (const reviewId of res.data) {
          const review = await axios.get(
            `http://localhost:5000/api/reviews/${reviewId}`
          );

          if(review.reviewTo == customerID){ reviews.push(review.data);}
      }

      dispatch({
        type: GET_REVIEWS,
        payload: reviews,
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
          'content-type': 'multipart/form-data',
        },
      };

      const data = new FormData();
      data.append('review', formData.review);
      data.append('reviewFrom', formData.reviewFrom);
      data.append('reviewTo', formData.reviewTo);
      data.append('starRating', formData.starRating);
      data.append('type', formData.type);
 

      console.log('DATA:', data);

      const res = await axios.post(
        `http://localhost:5000/api/reviews`,
        data,
        config
      );

      console.log(res.data);

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

  const disputeReview = async (reviewID) => {
    try{
      const res = await axios.patch('http://localhost:5000/api/reviews/needToHandle/${reviewID}');

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


  const deleteReview = (id) => dispatch({ type: DELETE_REVIEW, payload: id });

  return (
    <CustomerContext.Provider
      value={{
        recommendedDishes: state.recommendedDishes,
        reviews: state.reviews,
        getRecommendedDishes,
        getReviews,
        postReview,
        disputeReview,
        deleteReview,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
