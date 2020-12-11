import {
  RECOMMENDED_DISHES,
  ITEM_IN_CART,
  PLACE_ORDER,
  INSUFFFICIENT_BALANCE,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case RECOMMENDED_DISHES:
      return {
        ...state,
        recommendedDishes: action.payload,
      };

    case ITEM_IN_CART:
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload],
      };

    case PLACE_ORDER:
      return {
        ...state,
        itemsInCart: [],
      };

    case INSUFFFICIENT_BALANCE:
      return {
        ...state,
        error: action.payload,
        itemsInCart: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
