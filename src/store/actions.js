import history from "../history";
import {
  CLOSE_MODAL,
  FETCH_FILTERED_RECIPES,
  FETCH_INGREDIENTS,
  FETCH_RANDOM_RECIPE,
  FETCH_USER_INGREDIENTS,
  OAUTH_TOKEN_VERIFICATION,
  OPEN_MODAL,
  PREPARE_RECIPE,
  PUT_INGREDIENT_HOLODILNIK,
  PUT_INGREDIENTS_FILTER,
  REMOVE_INGREDIENT_HOLODILNIK,
  SIGN_IN_VALIDATION,
  SIGN_OUT,
  SIGN_UP,
  TOKEN_VERIFICATION,
  UPDATE_INGREDIENT_HOLODILNIK,
} from "./actionTypes";

export const goToRandomRecipe = () => {
  history.push("/random-recipe");
  return {
    type: FETCH_RANDOM_RECIPE,
  };
};

export const goToFilteredRecipes = (ingredients) => {
  history.push("/find-recipes");
  return {
    type: FETCH_FILTERED_RECIPES,
    payload: { ingredients },
  };
};

export const getIngredients = () => ({
  type: FETCH_INGREDIENTS,
});

export const putIngredientsFilter = (string) => ({
  type: PUT_INGREDIENTS_FILTER,
  payload: { string },
});

export const putIngredientHolodilnik = (ingredient, holodilnik) => ({
  type: PUT_INGREDIENT_HOLODILNIK,
  payload: { ingredient, holodilnik },
});

export const removeIngredientHolodilnik = (ingredient, holodilnik) => ({
  type: REMOVE_INGREDIENT_HOLODILNIK,
  payload: { ingredient, holodilnik },
});

export const updateIngredientHolodilnik = (weight, ingredient, holodilnik) => ({
  type: UPDATE_INGREDIENT_HOLODILNIK,
  payload: { weight, ingredient, holodilnik },
});

export const prepareRecipe = (recipeId, ingredients) => ({
  type: PREPARE_RECIPE,
  payload: { recipeId, ingredients },
});

export const getUserIngredients = () => ({
  type: FETCH_USER_INGREDIENTS,
});

export const signInValidation = (user) => ({
  type: SIGN_IN_VALIDATION,
  payload: user,
});

export const isAuthenticated = () => ({
  type: TOKEN_VERIFICATION,
});

export const signOutUser = () => {
  window.location.replace("/");
  return {
    type: SIGN_OUT,
  };
};

export const signUpUser = (user) => ({
  type: SIGN_UP,
  payload: user,
});

export const refreshToken = (token) => ({
  type: OAUTH_TOKEN_VERIFICATION,
  payload: token,
});

export const openModal = (payload) => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
