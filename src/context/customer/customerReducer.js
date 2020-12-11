import { RECOMMENDED_DISHES, GET_REVIEWS, POST_REVIEW, DISPUTE_REVIEW } from '../types';

export default (state, action) => {
  switch (action.type) {
    case RECOMMENDED_DISHES:
      return {
        ...state,
        recommendedDishes: action.payload,
      };

      case GET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
        };

      case POST_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
        };

      case DISPUTE_REVIEW:
        return {
          ...state,
          reviews: state.reviews.filter(
            review => review._id !== action.payload
          ),
        };

    default:
      return state;
  }
};
