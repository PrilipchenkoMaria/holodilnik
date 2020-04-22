import { FETCH_FILTERED_RECIPES, PUT_FILTERED_RECIPES } from "../actionTypes";

const initialState = {
  recipes: null,
  isFetching: false,
};

const filteredRecipes = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILTERED_RECIPES: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PUT_FILTERED_RECIPES: {
      return {
        ...state,
        isFetching: false,
        recipes: action.payload.recipes,
      };
    }
    default: {
      return state;
    }
  }
};

export default filteredRecipes;
