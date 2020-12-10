import {
  GET_MENUITEMS,
  GET_MENUITEMS_ERROR,
  CLEAR_ERRORS,
  SPECIAL_DISHES,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MENUITEMS:
      return {
        ...state,
        menuItems: action.payload,
        loading: false,
      };

    case GET_MENUITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SPECIAL_DISHES:
      return {
        ...state,
        specialDishes: state.menuItems.filter(
          (menuItem) => menuItem.specialItem
        ),
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      break;
  }
};
