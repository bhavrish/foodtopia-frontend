import React, { useReducer } from 'react';
import axios from 'axios';
import MenuItemsContext from './menuItemsContext';
import MenuItemsReducer from './menuItemsReducer';
import { GET_MENUITEMS, GET_MENUITEMS_ERROR, CLEAR_ERRORS } from '../types';

const MenuItemsState = (props) => {
  const initialState = {
    menuItems: [],
    menuItemsImages: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(MenuItemsReducer, initialState);

  // get menuItems
  const getMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menuItems');

      const menuItemsImages = {};

      // put image names of menuItems into menuItemsImages
      res.data.forEach(
        (menuItem) => (menuItemsImages[menuItem._id] = menuItem.image)
      );

      dispatch({
        type: GET_MENUITEMS,
        payload: {
          menuItems: res.data,
          menuItemsImages,
        },
      });
    } catch (error) {
      const errMsg =
        error.message === 'Network Error'
          ? 'Server Error'
          : error.response.data.msg;

      dispatch({
        type: GET_MENUITEMS_ERROR,
        payload: errMsg,
      });
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <MenuItemsContext.Provider
      value={{
        menuItems: state.menuItems,
        menuItemsImages: state.menuItemsImages,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getMenuItems,
        clearErrors,
      }}
    >
      {props.children}
    </MenuItemsContext.Provider>
  );
};

export default MenuItemsState;
