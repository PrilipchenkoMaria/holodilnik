import {call, put, takeEvery} from "redux-saga/effects";
import {
    EMAIL_MATCH,
    FETCH_RANDOM_RECIPE,
    PUT_RANDOM_RECIPE,
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
import {history} from "../history";


function* fetchRandomRecipe() {
    const recipe = yield call(() => fetch(`/api/recipes/random`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.json();
        }));

    yield put({type: PUT_RANDOM_RECIPE, payload: {recipe}});
}

function* fetchIngredients() {
    const ingredients = yield call(() => fetch(`/api/ingredients`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.json();
        }));

    yield put({type: PUT_INGREDIENTS, payload: {ingredients}});
}

function* fetchUserIngredients() {
    const token = localStorage.token;
    const ingredients = yield call(() => fetch(`/api/user/ingredients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(resp => resp.json()),
    );
    if (ingredients) yield put({type: PUT_INGREDIENTS_HOLODILNIK, payload: {ingredients}});
    else yield put({type: PUT_INGREDIENTS_HOLODILNIK_FAIL});
}

function* putUserIngredients(action) {
    let ingredients;
    if (action.type === "PUT_INGREDIENT_HOLODILNIK") {
        ingredients = [...action.payload.holodilnik, action.payload.ingredient];
    }
    if (action.type === "REMOVE_INGREDIENT_HOLODILNIK") {
        ingredients = action.payload.holodilnik.filter(i => i !== action.payload.ingredient);
    }
    if (!ingredients) return;
    const token = localStorage.token;
    const ingredientsStringify = JSON.stringify({ingredients});
    if (token) {
        yield call(() => fetch(`/api/user/ingredients`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: ingredientsStringify
            })
        );
    }
    yield put({type: PUT_INGREDIENTS_HOLODILNIK, payload: {ingredients}});
}

function* userSignInFetch(action) {
    const user = action.payload;
    const userStringify = JSON.stringify(user);
    const signInResponse = yield call(() => fetch(`/api/auth/signin`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userStringify,
        })
            .then(resp => resp.json()),
    );
    if (signInResponse.message === "Authentication successful!") {
        localStorage.setItem("token", signInResponse.token);
        yield put({type: SIGN_IN_SUCCESS, payload: {token: signInResponse.token, userId: signInResponse.userId}});
        history.push("/");
    } else yield put({type: SIGN_IN_FAIL});
}

function* tokenVerification() {
    const token = localStorage.token;

    if (!token) return;
    const tokenVerificationResponse = yield call(() => fetch(`/api/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(resp => resp.json()),
    );

    if (tokenVerificationResponse.message) {
        localStorage.removeItem("token");
    } else if (tokenVerificationResponse.userId) {
        yield put({type: SIGN_IN_SUCCESS, payload: {token: token, userId: tokenVerificationResponse.userId}});
    }
}

function* userSignUpFetch(action) {
    const user = action.payload;
    const userStringify = JSON.stringify(user);
    const signUpResponse = yield call(() => fetch(`/api/auth/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userStringify,
        })
            .then(resp => resp.json()),
    );

    if (signUpResponse.message === "User created!") {
        localStorage.setItem("token", signUpResponse.token);
        yield put({type: SIGN_IN_SUCCESS, payload: {token: signUpResponse.token, userId: signUpResponse.userId}});
        history.push("/");
    } else if (signUpResponse.message === "This email already taken") {
        yield put({type: EMAIL_MATCH});
    }
}

export function* rootSaga() {
    yield takeEvery(TOKEN_VERIFICATION, tokenVerification);
    yield takeEvery(FETCH_RANDOM_RECIPE, fetchRandomRecipe);
    yield takeEvery(FETCH_INGREDIENTS, fetchIngredients);
    yield takeEvery(FETCH_USER_INGREDIENTS, fetchUserIngredients);
    yield takeEvery(PUT_INGREDIENT_HOLODILNIK, putUserIngredients);
    yield takeEvery(REMOVE_INGREDIENT_HOLODILNIK, putUserIngredients);
    yield takeEvery(SIGN_IN_VALIDATION, userSignInFetch);
    yield takeEvery(SIGN_UP, userSignUpFetch);
}
