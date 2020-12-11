import {
  GET_MENUITEMS,
  GET_MENUITEMS_ERROR,
  CLEAR_ERRORS,
  SPECIAL_DISHES,
  SEARCH_MENUITEMS,
  CLEAR_SEARCH,
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

    case SEARCH_MENUITEMS:
      return {
        ...state,
        filtered: state.menuItems.filter((menuItem) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return menuItem.title.match(regex);
        }),
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        filtered: null,
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
