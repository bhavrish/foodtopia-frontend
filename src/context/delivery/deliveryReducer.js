import { GET_ORDERS, DELIVER_SUCCESS, GET_REVIEWS, POST_REVIEW, DISPUTE_REVIEW } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case DELIVER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order._id !== action.payload
        ),
      };

      case GET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
        };

      /*case POST_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
        };*/

      case DISPUTE_REVIEW:
        return {
          ...state,
          reviews: state.reviews.filter(
            review => review._id !== action.payload
          ),
        };

    default:
      break;
  }
};
