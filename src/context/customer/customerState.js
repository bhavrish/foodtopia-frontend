import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { RECOMMENDED_DISHES, DISCUSSION_POSTS_SUCCESS, GET_REVIEWS, POST_REVIEW, DISPUTE_REVIEW } from '../types';

const CustomerState = (props) => {
  const initialState = {
    recommendedDishes: [],
    reviews:[],
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
    } catch (error){
      console.log(error);
    }
  };

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
    try{
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
    try{
      const res = await axios.patch(
        `http://localhost:5000/api/reviews/needToHandle/${reviewID}`,
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
        discussionPosts: state.discussionPosts,
        reviews: state.reviews,
        getRecommendedDishes,
        getReviews,
        postReview,
        customerDisputeReview,
        getDiscussionPosts,
        postToDiscussion,
        flagDiscussionPost,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
