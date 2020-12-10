import { CREATE_RECIPE, GET_RECIPES } from '../types';

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

    default:
      break;
  }
};
