import React, { useReducer } from 'react';
import axios from 'axios';
import ChefContext from './chefContext';
import ChefReducer from './chefReducer';
import { GET_RECIPES, CREATE_RECIPE, GET_REVIEWS, DISPUTE_REVIEW } from '../types';

const ChefState = (props) => {
  const initialState = {
    recipes: [],
    reviews: [],
    error: null,
  };

  const [state, dispatch] = useReducer(ChefReducer, initialState);

  const getRecipes = async (chefID) => {
    try {
      console.log(chefID);
      const res = await axios.get(
        `http://localhost:5000/api/menuItems?chefID=${chefID}`
      );

      console.log(res.data);
      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const createRecipe = async (formData) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const data = new FormData();
      data.append('image', formData.image);
      data.append('title', formData.title);
      data.append('chefID', formData.chefID);
      data.append('chefName', formData.chefName);
      data.append('description', formData.description);
      data.append('ingredients', formData.ingredients);
      data.append('dietaryRestrictions', formData.dietaryRestrictions);
      data.append('price', formData.price);

      console.log('DATA:', data);

      const res = await axios.post(
        `http://localhost:5000/api/menuItems`,
        data,
        config
      );

      console.log(res.data);

      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get reviews
  const getReviews = async (chefID) => {
    try {

      const res = await axios.get(
        'http://localhost:5000/api/reviews?reviewTo=chefID'
      );

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });
    } catch (error){
      console.log(error);
    }
  };

  const disputeReview = async (reviewID) => {
    try{
      const review = await axios.patch('http://localhost:5000/api/reviews/needToHandle/${reviewID}');
      
      review.needToBeHandled = true;

      dispatch({
        type: DISPUTE_REVIEW,
        payload: {
          reviews: review.data,
        },
      });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <ChefContext.Provider
      value={{
        recipes: state.recipes,
        reviews: state.reviews,
        error: state.error,
        getRecipes,
        createRecipe,
        getReviews,
        disputeReview,
      }}
    >
      {props.children}
    </ChefContext.Provider>
  );
};

export default ChefState;
