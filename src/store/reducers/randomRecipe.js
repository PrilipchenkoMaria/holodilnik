import { FETCH_RANDOM_RECIPE, PUT_RANDOM_RECIPE } from "../actionTypes";

const initialState = {
  recipe: null,
  isFetching: false,
};

const randomRecipe = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANDOM_RECIPE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PUT_RANDOM_RECIPE: {
      return {
        ...state,
        isFetching: false,
        recipe: action.payload.recipe,
      };
    }
    default: {
      return state;
    }
  }
};

export default randomRecipe;
