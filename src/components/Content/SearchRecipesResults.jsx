import React from "react";
import { Switch, Route } from "react-router-dom";
import FilteredRecipes from "./FilteredRecipes";
import AllRecipes from "./AllRecipes";
import RandomRecipe from "./RandomRecipe";

function SearchRecipesResults() {
  return (
    <div className="search-recipes-results">
      <Switch>
        <Route path="/find-recipes" component={FilteredRecipes} />
        <Route path="/add-ingredients" component={AllRecipes} />
        <Route path="/random-recipe" component={RandomRecipe} />
        <Route path="/" component={AllRecipes} />
      </Switch>
    </div>
  );
}

export default SearchRecipesResults;
