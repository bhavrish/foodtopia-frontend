import {
  RECOMMENDED_DISHES,
  ITEM_IN_CART,
  PLACE_ORDER,
  INSUFFICIENT_BALANCE,
  NEW_BALANCE,
  CLEAR_ERRORS,
  DISCUSSION_POSTS_SUCCESS,
  GET_REVIEWS,
  POST_REVIEW,
  DISPUTE_REVIEW,
  GET_ORDERS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case RECOMMENDED_DISHES:
      return {
        ...state,
        recommendedDishes: action.payload,
      };

    case DISCUSSION_POSTS_SUCCESS:
      return {
        ...state,
        discussionPosts: action.payload,
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    /*
      case POST_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
        };*/

    case DISPUTE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
      };
    case ITEM_IN_CART:
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload],
      };

    case PLACE_ORDER:
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (itemsInCart) => itemsInCart._id !== action.payload.menuItem
        ),
      };

    case INSUFFICIENT_BALANCE:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_BALANCE:
      return {
        ...state,
        newBalance: action.payload,
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
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
