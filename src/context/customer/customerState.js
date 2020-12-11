import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { RECOMMENDED_DISHES, DISCUSSION_POSTS_SUCCESS } from '../types';

const CustomerState = (props) => {
  const initialState = {
    recommendedDishes: [],
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
        getRecommendedDishes,
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
