import React, { useReducer } from 'react';
import axios from 'axios';
import ChefContext from './chefContext';
import ChefReducer from './chefReducer';
import { GET_RECIPES, CREATE_RECIPE } from '../types';

const ChefState = (props) => {
  const initialState = {
    recipes: [],
    error: null,
  };

  const [state, dispatch] = useReducer(ChefReducer, initialState);

  const getRecipes = async (chefId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/menuItems?chefId=${chefId}`
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
      const res = await axios.post(`http://localhost:5000/api/menuItems`, {
        title: formData.title,
        chefName: formData.chefName,
        chefId: formData.chefId,
        description: formData.description,
        ingredients: formData.ingredients,
        dietaryRestrictions: formData.dietaryRestrictions,
        type: formData.type,
        price: formData.price,
        image: formData.image,
      });

      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    } catch (error) {}
  };

  return (
    <ChefContext.Provider
      value={{
        recipes: state.recipes,
        error: state.error,
        getRecipes,
        createRecipe,
      }}
    >
      {props.children}
    </ChefContext.Provider>
  );
};

export default ChefState;
