import {
  FETCH_INGREDIENTS,
  FETCH_USER_INGREDIENTS,
  PREPARE_RECIPE,
  PUT_INGREDIENT_HOLODILNIK,
  PUT_INGREDIENTS,
  PUT_INGREDIENTS_FILTER,
  PUT_INGREDIENTS_HOLODILNIK,
  PUT_INGREDIENTS_HOLODILNIK_FAIL,
  REMOVE_INGREDIENT_HOLODILNIK,
  UPDATE_INGREDIENT_HOLODILNIK,
} from "../actionTypes";

const initialState = {
  ingredients: null,
  isFetching: false,
  filterCondition: null,
  holodilnik: [],
  isHolodilnikFetching: false,
};

const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case REMOVE_INGREDIENT_HOLODILNIK:
    case UPDATE_INGREDIENT_HOLODILNIK:
    case PUT_INGREDIENT_HOLODILNIK:
    case PREPARE_RECIPE:
    case FETCH_USER_INGREDIENTS: {
      return {
        ...state,
        isHolodilnikFetching: true,
      };
    }
    case PUT_INGREDIENTS: {
      return {
        ...state,
        isFetching: false,
        ingredients: action.payload.ingredients,
      };
    }
    case PUT_INGREDIENTS_FILTER: {
      return {
        ...state,
        filterCondition: action.payload.string,
      };
    }
    case PUT_INGREDIENTS_HOLODILNIK: {
      return {
        ...state,
        isHolodilnikFetching: false,
        holodilnik: action.payload.ingredients,
      };
    }
    case PUT_INGREDIENTS_HOLODILNIK_FAIL: {
      return {
        ...state,
        isHolodilnikFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredients;
