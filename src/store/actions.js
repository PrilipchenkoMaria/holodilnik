import {
    CLOSE_MODAL,
    FETCH_INGREDIENTS,
    FETCH_RANDOM_RECIPE,
    OPEN_INGREDIENT_MODAL,
    PUT_INGREDIENTS_FILTER,
    SIGN_IN_VALIDATION,
    SIGN_OUT,
    SIGN_UP,
    TOKEN_VERIFICATION,
    PUT_INGREDIENT_HOLODILNIK,
    REMOVE_INGREDIENT_HOLODILNIK,
    FETCH_USER_INGREDIENTS,
} from "./actionTypes";
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

export const putIngredientsFilter = (string) => {
    return {
        type: PUT_INGREDIENTS_FILTER,
        payload: {string},
    };
};

export const putIngredientHolodilnik = (ingredient, holodilnik) => {
    return {
        type: PUT_INGREDIENT_HOLODILNIK,
        payload: {ingredient, holodilnik},
    };
};

export const removeIngredientHolodilnik = (ingredient, holodilnik) => {
    return {
        type: REMOVE_INGREDIENT_HOLODILNIK,
        payload: {ingredient, holodilnik},
    };
};

export const getUserIngredients = () => {
    return {
        type: FETCH_USER_INGREDIENTS,
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
