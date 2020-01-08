import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_RANDOM_RECIPE, PUT_RANDOM_RECIPE, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_IN_VALIDATION} from "./actionTypes";
import {history} from "../history";


export function* fetchRandomRecipe() {
    const recipe = yield call(() => fetch(`/recipes/random`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.json();
        }));

    yield put({type: PUT_RANDOM_RECIPE, payload: {recipe}});
}

export function* userSignInFetch(action) {
    const user = action.payload;
    const userStringify = JSON.stringify(user);
    const signInResponse = yield call(() => fetch(`/api/auth/signin`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userStringify,
        })
            .then(resp => resp.json()),
    );
    console.log(signInResponse.message);
    console.log(signInResponse);
    if (signInResponse.message === "Incorrect email or password") {

        yield put({type: SIGN_IN_FAIL, payload: {errorMessage: signInResponse.message}});
    }
    //todo: прикрутить нормальную логику
    if (signInResponse.message === "Invalid payload") {
        yield put({type: SIGN_IN_FAIL});
    }
    if (signInResponse.message === "Authentication successful!")  {
        localStorage.setItem("token", signInResponse.token);
        yield put({type: SIGN_IN_SUCCESS, payload: {token: signInResponse.token, userId: signInResponse.userId}});
        history.push("/");
    }
}

export function* rootSaga() {
    yield takeEvery(FETCH_RANDOM_RECIPE, fetchRandomRecipe);
    yield takeEvery(SIGN_IN_VALIDATION, userSignInFetch);
}

