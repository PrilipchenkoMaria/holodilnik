import {FETCH_RANDOM_RECIPE, SIGN_IN_VALIDATION, TOKEN_VERIFICATION} from "./actionTypes";
import {history} from "../history";

export const goToRandomRecipe = () => {
    history.push("/random-recipe");
    return {
        type: FETCH_RANDOM_RECIPE,
    };
};

export const signInValidation = (user) => {
    return {
        type: SIGN_IN_VALIDATION,
        payload: user,
    };
};

export const isAuthenticated = () => {
    return {
        type: TOKEN_VERIFICATION,
    };
};
