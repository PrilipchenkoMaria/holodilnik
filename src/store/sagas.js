import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_RANDOM_RECIPE, PUT_RANDOM_RECIPE} from "./actionTypes";


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


export function* rootSaga() {
    yield takeEvery(FETCH_RANDOM_RECIPE, fetchRandomRecipe);
}
