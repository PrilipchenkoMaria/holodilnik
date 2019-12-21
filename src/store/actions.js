import {FETCH_RANDOM_RECIPE} from "./actionTypes";
import {history} from "../history";

export const goToRandomRecipe = () => {
    history.push("/random-recipe");
    return {
        type: FETCH_RANDOM_RECIPE,
    };
};