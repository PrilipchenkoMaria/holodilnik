import {FETCH_RANDOM_RECIPE, SIGN_IN_VALIDATION, SIGN_OUT, SIGN_UP, TOKEN_VERIFICATION, OPEN_INGREDIENT_MODAL, CLOSE_MODAL, FETCH_INGREDIENTS} from "./actionTypes";
import {history} from "../history";

export const goToRandomRecipe = () => {
    history.push("/random-recipe");
    return {
        type: FETCH_RANDOM_RECIPE,
    };
};

export const getIngredients = () => {
    return {
        type: FETCH_INGREDIENTS,
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

export const signOutUser = () => {
    window.location.replace("/");
    return {
        type: SIGN_OUT,
    };
};

export const signUpUser = (user) => {
    return {
        type: SIGN_UP,
        payload: user,
    };
};

export const openIngredientModal = () => {
    return {
        type: OPEN_INGREDIENT_MODAL,
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    };
};
