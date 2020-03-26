import {call, put, takeEvery} from "redux-saga/effects";
import {
    EMAIL_MATCH,
    FETCH_RANDOM_RECIPE,
    PUT_RANDOM_RECIPE,
    PUT_INGREDIENTS,
    FETCH_INGREDIENTS,
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
    yield takeEvery(SIGN_IN_VALIDATION, userSignInFetch);
    yield takeEvery(SIGN_UP, userSignUpFetch);
}
