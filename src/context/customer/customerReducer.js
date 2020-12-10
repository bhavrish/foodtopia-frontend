import { RECOMMENDED_DISHES, GET_REVIEWS, POST_REVIEW, DELETE_REVIEW, DISPUTE_REVIEW } from '../types';

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
    
      case DELETE_REVIEW:
        return {
          ...state,
          reviews: state.reviews.filter(review => review.id != action.payload),
        };

      case DISPUTE_REVIEW:
        return {
          ...state,
          reviews: action.payload,
        };

    default:
      return state;
  }
};
