import { combineReducers } from "redux";
import randomRecipe from "./randomRecipe";
import ingredients from "./ingredients";
import auth from "./auth";
import modal from "./modal";

export default combineReducers({
    randomRecipe,
    ingredients,
    auth,
    modal,
});
