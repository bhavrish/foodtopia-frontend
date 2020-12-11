import { RECOMMENDED_DISHES, DISCUSSION_POSTS_SUCCESS } from '../types';

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

    default:
      return state;
  }
};
