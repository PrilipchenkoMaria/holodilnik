import {
  FETCH_INGREDIENTS,
  PUT_INGREDIENTS,
  PUT_INGREDIENTS_FILTER,
  FETCH_USER_INGREDIENTS,
  PUT_INGREDIENTS_HOLODILNIK,
  PUT_INGREDIENTS_HOLODILNIK_FAIL,
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
