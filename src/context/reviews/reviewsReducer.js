import { GET_REVIEWS, POST_REVIEW, DELETE_REVIEW } from '../types';

export default (state, action) => {
  switch (action.type) {
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

    default:
      break;
  }
};