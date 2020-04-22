import { call, put, takeEvery } from "redux-saga/effects";
import {
  EMAIL_MATCH,
  FETCH_RANDOM_RECIPE,
  PUT_RANDOM_RECIPE,
  FETCH_FILTERED_RECIPES,
  PUT_FILTERED_RECIPES,
  PUT_INGREDIENTS,
  FETCH_INGREDIENTS,
  PUT_INGREDIENTS_HOLODILNIK,
  FETCH_USER_INGREDIENTS,
  PUT_INGREDIENTS_HOLODILNIK_FAIL,
  PUT_INGREDIENT_HOLODILNIK,
  REMOVE_INGREDIENT_HOLODILNIK,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_VALIDATION,
  SIGN_UP,
  TOKEN_VERIFICATION,
} from "./actionTypes";
import history from "../history";


function* fetchRandomRecipe() {
  const recipe = yield call(() => fetch("/api/recipes/random")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not found");
      }
      return res.json();
    }));

  yield put({ type: PUT_RANDOM_RECIPE, payload: { recipe } });
}

function* fetchFilteredRecipes(action) {
  const ingredients = action.payload;
  if (!ingredients) return;
  const dataStringify = JSON.stringify(ingredients);
  const recipes = yield call(() => fetch("/api/recipes/filtered", {
    method: "POST",
    body: dataStringify,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json()));
  yield put({ type: PUT_FILTERED_RECIPES, payload: { recipes } });
}

function* fetchIngredients() {
  const ingredients = yield call(() => fetch("/api/ingredients")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not found");
      }
      return res.json();
    }));

  yield put({ type: PUT_INGREDIENTS, payload: { ingredients } });
}

function* fetchUserIngredients() {
  const { token } = localStorage;
  const ingredients = yield call(() => fetch("/api/user/ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json()));
  if (ingredients && ingredients.status !== 401) {
    yield put({ type: PUT_INGREDIENTS_HOLODILNIK, payload: { ingredients } });
  } else yield put({ type: PUT_INGREDIENTS_HOLODILNIK_FAIL });
}

function* putUserIngredients(action) {
  let ingredients;
  if (action.type === "PUT_INGREDIENT_HOLODILNIK") {
    ingredients = [...action.payload.holodilnik, action.payload.ingredient];
  }
  if (action.type === "REMOVE_INGREDIENT_HOLODILNIK") {
    ingredients = action.payload.holodilnik.filter((i) => i !== action.payload.ingredient);
  }
  if (!ingredients) return;
  const { token } = localStorage;
  const ingredientsStringify = JSON.stringify({ ingredients });
  if (token) {
    yield call(() => fetch("/api/user/ingredients", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: ingredientsStringify,
    }));
  }
  yield put({ type: PUT_INGREDIENTS_HOLODILNIK, payload: { ingredients } });
}

function* userSignInFetch(action) {
  const user = action.payload;
  const userStringify = JSON.stringify(user);
  const signInResponse = yield call(() => fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((resp) => resp.json()));
  if (signInResponse.message === "Authentication successful!") {
    localStorage.setItem("token", signInResponse.token);
    yield put({ type: SIGN_IN_SUCCESS, payload: { token: signInResponse.token } });
    history.push("/");
  } else yield put({ type: SIGN_IN_FAIL });
}

function* tokenVerification() {
  const { token } = localStorage;
  if (!token) return;
  const tokenVerificationStatus = yield call(() => fetch("/api/user/auth/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.status));
  if (tokenVerificationStatus === 200) {
    yield put({ type: SIGN_IN_SUCCESS, payload: { token } });
  } else {
    localStorage.removeItem("token");
    yield put({ type: SIGN_IN_FAIL });
  }
}

function* userSignUpFetch(action) {
  const user = action.payload;
  const userStringify = JSON.stringify(user);
  const signUpResponse = yield call(() => fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((resp) => resp.json()));

  if (signUpResponse.message === "User created!") {
    localStorage.setItem("token", signUpResponse.token);
    yield put({ type: SIGN_IN_SUCCESS, payload: { token: signUpResponse.token, userId: signUpResponse.userId } });
    history.push("/");
  } else if (signUpResponse.message === "This email already taken") {
    yield put({ type: EMAIL_MATCH });
  }
}

export default function* rootSaga() {
  yield takeEvery(TOKEN_VERIFICATION, tokenVerification);
  yield takeEvery(FETCH_RANDOM_RECIPE, fetchRandomRecipe);
  yield takeEvery(FETCH_FILTERED_RECIPES, fetchFilteredRecipes);
  yield takeEvery(FETCH_INGREDIENTS, fetchIngredients);
  yield takeEvery(FETCH_USER_INGREDIENTS, fetchUserIngredients);
  yield takeEvery(PUT_INGREDIENT_HOLODILNIK, putUserIngredients);
  yield takeEvery(REMOVE_INGREDIENT_HOLODILNIK, putUserIngredients);
  yield takeEvery(SIGN_IN_VALIDATION, userSignInFetch);
  yield takeEvery(SIGN_UP, userSignUpFetch);
}
