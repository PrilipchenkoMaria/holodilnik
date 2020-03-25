import { combineReducers } from "redux";
import randomRecipe from "./randomRecipe";
import auth from "./auth";
import modal from "./modal";

export default combineReducers({
    randomRecipe,
    auth,
    modal,
});
