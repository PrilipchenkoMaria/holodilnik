import React from "react";
import { Switch, Route } from "react-router-dom";
import FilteredRecipes from "./FilteredRecipes";
import AllRecipes from "./AllRecipes";
import RandomRecipe from "./RandomRecipe";
import NoRequest from "./NoRequest";


function SearchRecipesResults() {
  return (
    <div className="SearchRecipesResults">
      <Switch>
        <Route path="/no-request" component={NoRequest} />
        <Route path="/find-recipes" component={FilteredRecipes} />
        <Route path="/all-recipes" component={AllRecipes} />
        <Route path="/random-recipe" component={RandomRecipe} />
      </Switch>
    </div>
  );
}

export default SearchRecipesResults;
