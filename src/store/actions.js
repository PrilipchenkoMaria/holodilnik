import {FETCH_RANDOM_RECIPE} from "./actionTypes";


export const goToRandomRecipe = (history) => {
    history.push("/random-recipe");

    return {
        type: FETCH_RANDOM_RECIPE,
    };
};