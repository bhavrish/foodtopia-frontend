import { RECOMMENDED_DISHES, ITEM_IN_CART } from '../types';

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

    default:
      return state;
  }
};
