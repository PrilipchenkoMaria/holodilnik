import { call, put, takeEvery } from "redux-saga/effects";
import history from "../history";

import {
  getFilteredRecipes,
  getIngredients,
  getRandomRecipe,
  getRefreshToken,
  getUserIngredients,
  getVerificationStatus,
  postSignIn,
  postSignUp,
  putPrepareRecipe,
  putUserIngredients,
} from "../services/HTTPService";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  CLOSE_MODAL,
  EMAIL_MATCH,
  FETCH_FILTERED_RECIPES,
  FETCH_INGREDIENTS,
  FETCH_RANDOM_RECIPE,
  FETCH_USER_INGREDIENTS,
  OAUTH_TOKEN_VERIFICATION,
  PREPARE_RECIPE,
  PUT_FILTERED_RECIPES,
  PUT_INGREDIENT_HOLODILNIK,
  PUT_INGREDIENTS,
  PUT_INGREDIENTS_HOLODILNIK,
  PUT_INGREDIENTS_HOLODILNIK_FAIL,
  PUT_RANDOM_RECIPE,
  REMOVE_INGREDIENT_HOLODILNIK,
  SIGN_IN_VALIDATION,
  SIGN_UP,
  TOKEN_VERIFICATION,
  UPDATE_INGREDIENT_HOLODILNIK,
} from "./actionTypes";

function* fetchRandomRecipe() {
  const recipe = yield call(() => getRandomRecipe());
  yield put({ type: PUT_RANDOM_RECIPE, payload: { recipe } });
}

function* fetchFilteredRecipes(action) {
  const ingredients = action.payload;
  if (!ingredients) return;
  const recipes = yield call(() => getFilteredRecipes(ingredients));
  yield put({ type: PUT_FILTERED_RECIPES, payload: { recipes } });
}

function* fetchIngredients() {
  const ingredients = yield call(() => getIngredients());
  yield put({ type: PUT_INGREDIENTS, payload: { ingredients } });
}

function* fetchUserIngredients() {
  const { token } = localStorage;
  const ingredients = yield call(() => getUserIngredients(token));
  if (ingredients && ingredients.status !== 401) {
    yield put({ type: PUT_INGREDIENTS_HOLODILNIK, payload: { ingredients } });
  } else yield put({ type: PUT_INGREDIENTS_HOLODILNIK_FAIL });
}

function* handleUserIngredients(action) {
  let ingredients;
  if (action.type === "PUT_INGREDIENT_HOLODILNIK") {
    ingredients = [...action.payload.holodilnik, action.payload.ingredient];
  }
  if (action.type === "REMOVE_INGREDIENT_HOLODILNIK") {
    ingredients = action.payload.holodilnik.filter((i) => i !== action.payload.ingredient);
  }
  if (action.type === "UPDATE_INGREDIENT_HOLODILNIK") {
    ingredients = action.payload.holodilnik.map(
      (i) => (i.name !== action.payload.ingredient.name ? i : { name: i.name, weight: action.payload.weight }),
    );
  }
  if (!ingredients) return;
  const { token } = localStorage;
  if (token) {
    yield call(() => putUserIngredients(ingredients, token));
  }
  yield put({ type: PUT_INGREDIENTS_HOLODILNIK, payload: { ingredients } });
}

function* prepareRecipe(action) {
  const { token } = localStorage;
  const { ingredients } = yield call(() => putPrepareRecipe({
    token, recipeId: action.payload.recipeId, ingredients: action.payload.ingredients,
  }));
  if (ingredients) {
    yield put({ type: PUT_INGREDIENTS_HOLODILNIK, payload: { ingredients } });
  } else yield put({ type: PUT_INGREDIENTS_HOLODILNIK_FAIL });
}

function* userSignInFetch(action) {
  const user = action.payload;
  const signInResponse = yield call(() => postSignIn(user));
  if (signInResponse.message === "Authentication successful!") {
    localStorage.setItem("token", signInResponse.token);
    yield put({ type: AUTH_SUCCESS, payload: { token: signInResponse.token } });
    yield put({ type: CLOSE_MODAL });
    yield fetchUserIngredients();
  } else yield put({ type: AUTH_FAIL });
}

function* tokenVerification() {
  const { token } = localStorage;
  if (!token) return;
  const tokenVerificationStatus = yield call(() => getVerificationStatus(token));
  if (tokenVerificationStatus === 200) {
    yield put({ type: AUTH_SUCCESS, payload: { token } });
  } else {
    localStorage.removeItem("token");
    yield put({ type: AUTH_FAIL });
  }
}

function* userSignUpFetch(action) {
  const user = action.payload;
  const signUpResponse = yield call(() => postSignUp(user));
  if (signUpResponse.message === "User created!") {
    localStorage.setItem("token", signUpResponse.token);
    yield put({ type: AUTH_SUCCESS, payload: { token: signUpResponse.token, userId: signUpResponse.userId } });
    yield put({ type: CLOSE_MODAL });
  } else if (signUpResponse.message === "This email already taken") {
    yield put({ type: EMAIL_MATCH });
  }
}

function* refreshTokenFetch(action) {
  const token = action.payload;
  const refreshTokenResponse = yield call(() => getRefreshToken(token));
  if (refreshTokenResponse.token) {
    localStorage.setItem("token", refreshTokenResponse.token);
    yield put({ type: AUTH_SUCCESS, payload: { token: refreshTokenResponse.token } });
    history.push("/");
  } else yield put({ type: AUTH_FAIL });
}

export default function* rootSaga() {
  yield takeEvery(TOKEN_VERIFICATION, tokenVerification);
  yield takeEvery(FETCH_RANDOM_RECIPE, fetchRandomRecipe);
  yield takeEvery(FETCH_FILTERED_RECIPES, fetchFilteredRecipes);
  yield takeEvery(FETCH_INGREDIENTS, fetchIngredients);
  yield takeEvery(FETCH_USER_INGREDIENTS, fetchUserIngredients);
  yield takeEvery(PUT_INGREDIENT_HOLODILNIK, handleUserIngredients);
  yield takeEvery(REMOVE_INGREDIENT_HOLODILNIK, handleUserIngredients);
  yield takeEvery(UPDATE_INGREDIENT_HOLODILNIK, handleUserIngredients);
  yield takeEvery(PREPARE_RECIPE, prepareRecipe);
  yield takeEvery(SIGN_IN_VALIDATION, userSignInFetch);
  yield takeEvery(SIGN_UP, userSignUpFetch);
  yield takeEvery(OAUTH_TOKEN_VERIFICATION, refreshTokenFetch);
}
