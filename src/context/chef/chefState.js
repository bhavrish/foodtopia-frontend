import React, { useReducer } from 'react';
import axios from 'axios';
import ChefContext from './chefContext';
import ChefReducer from './chefReducer';
import { GET_RECIPES, CREATE_RECIPE, GET_ORDERS, COOK_SUCCESS, GET_REVIEWS, DISPUTE_REVIEW } from '../types';

const ChefState = (props) => {
  const initialState = {
    recipes: [],
    reviews: [],
    orders: [],
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

  const disputeReview = async (reviewID) => {
    try{
      const review = await axios.patch(`http://localhost:5000/api/reviews/needToHandle/${reviewID}`);
      
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

  const getOrders = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const type = 'chef';

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

  const cookOrder = async (orderData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const orderID = orderData.orderID;
    const chefID = orderData.chefID;
    console.log(orderID);
    console.log(chefID);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/cook/${orderID}`,
        {
          chefID,
        },
        config
      );

      dispatch({
        type: COOK_SUCCESS,
        payload: orderID,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <ChefContext.Provider
      value={{
        recipes: state.recipes,
        reviews: state.reviews,
        orders: state.orders,
        error: state.error,
        getRecipes,
        createRecipe,
        getReviews,
        disputeReview,
        getOrders,
        cookOrder,
      }}
    >
      {props.children}
    </ChefContext.Provider>
  );

};

export default ChefState;
