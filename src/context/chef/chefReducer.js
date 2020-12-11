import { CREATE_RECIPE, GET_RECIPES, GET_ORDERS, COOK_SUCCESS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case COOK_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order._id !== action.payload
        ),
      };

    default:
      break;
  }
};
