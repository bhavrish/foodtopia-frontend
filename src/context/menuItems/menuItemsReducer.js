import { GET_MENUITEMS, GET_MENUITEMS_ERROR, CLEAR_ERRORS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MENUITEMS:
      return {
        ...state,
        menuItems: action.payload.menuItems,
        menuItemsImages: action.payload.menuItemsImages,
        loading: false,
      };

    case GET_MENUITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
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
