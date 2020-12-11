import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import {
  RECOMMENDED_DISHES,
  ITEM_IN_CART,
  PLACE_ORDER,
  INSUFFFICIENT_BALANCE,
  CLEAR_ERRORS,
} from '../types';

const CustomerState = (props) => {
  const initialState = {
    recommendedDishes: [],
    itemsInCart: [],
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

  const addToCart = (menuItem) =>
    dispatch({ type: ITEM_IN_CART, payload: menuItem });

  const createOrder = async (order, userBalance) => {
    try {
      if (order.price > userBalance) {
        return dispatch({
          type: INSUFFFICIENT_BALANCE,
          payload: 'Insufficient balance',
        });
      }

      const res = await axios.post('http://localhost:5000/api/orders', {
        menuItemID: order.menuItemID,
        customerID: order.customerID,
        deliveryNeeded: order.deliveryNeeded,
        price: order.price,
      });

      dispatch({
        type: PLACE_ORDER,
      });
    } catch (error) {}
  };

  const clearError = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <CustomerContext.Provider
      value={{
        recommendedDishes: state.recommendedDishes,
        itemsInCart: state.itemsInCart,
        error: state.error,
        getRecommendedDishes,
        addToCart,
        createOrder,
        clearError,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
