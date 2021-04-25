import React from "react";
import SearchIngredient from "./SearchIngredient";
import IngredientsList from "./IngredientsList";
import RecipesButtons from "./RecipesButtons";
import SearchRecipesResults from "./SearchRecipesResults";

function Home() {
  return (
    <div className="home">
      <SearchIngredient />
      <IngredientsList />
      <RecipesButtons />
      <SearchRecipesResults />
    </div>
  );
}

export default Home;
