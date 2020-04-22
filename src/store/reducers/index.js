import { combineReducers } from "redux";
import randomRecipe from "./randomRecipe";
import filteredRecipes from "./filteredRecipes";
import ingredients from "./ingredients";
import auth from "./auth";
import modal from "./modal";

export default combineReducers({
  randomRecipe,
  filteredRecipes,
  ingredients,
  auth,
  modal,
});
