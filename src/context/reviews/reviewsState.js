import React, { useReducer } from 'react';
import axios from 'axios';
import ReviewsContext from './reviewsContext';
import ReviewsReducer from './reviewsReducer';
import { GET_REVIEWS, POST_REVIEW, DELETE_REVIEW } from '../types';

const ReviewsState = (props) => {
  const initialState = {
    reviews: [],
    msg: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ReviewsReducer, initialState);

  // get reviews
  const getReviews = async (_id) => {
    //try {
      const res = await axios.get('http://localhost:5000/api/reviews');

      console.log(res.data);

      dispatch({
        type: GET_REVIEWS,
        payload: {
          reviews: res.data,
        },
      });
  };

  // post reviews
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
    //

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


  //const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <ReviewsContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getReviews,
        postReview,
        deleteReview,
      }}
    >
      {props.children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsState;