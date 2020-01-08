import { combineReducers } from "redux";
import randomRecipe from "./randomRecipe"
import auth from "./auth"

export default combineReducers({
    randomRecipe,
    auth,
});

