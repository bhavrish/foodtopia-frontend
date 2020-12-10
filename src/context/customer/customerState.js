import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { RECOMMENDED_DISHES, ITEM_IN_CART } from '../types';

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

  const createOrder = async (order) => {
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        menuItemID: order.menuItemIdD,
        customerID: order.customerID,
        deliveryNeeded: order.deliveryNeeded,
        price: order.price,
      });
    } catch (error) {}
  };

  return (
    <CustomerContext.Provider
      value={{
        recommendedDishes: state.recommendedDishes,
        itemsInCart: state.itemsInCart,
        getRecommendedDishes,
        addToCart,
        createOrder,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
