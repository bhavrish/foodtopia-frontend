import React, { useReducer } from 'react';
import axios from 'axios';
import DeliveryContext from './deliveryContext';
import DeliveryReducer from './deliveryReducer';
import { GET_ORDERS, DELIVER_SUCCESS } from '../types';

const DeliveryState = (props) => {
  const initialState = {
    orders: [],
    error: null,
  };

  const [state, dispatch] = useReducer(DeliveryReducer, initialState);

  const getOrders = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const type = 'delivery';

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

  const deliverOrder = async (orderData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const orderID = orderData.orderID;
    const deliveryID = orderData.deliveryID;
    console.log(orderID);
    console.log(deliveryID);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/deliver/${orderID}`,
        {
          deliveryID,
        },
        config
      );

      dispatch({
        type: DELIVER_SUCCESS,
        payload: orderID,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <DeliveryContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        getOrders,
        deliverOrder,
      }}
    >
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryState;
