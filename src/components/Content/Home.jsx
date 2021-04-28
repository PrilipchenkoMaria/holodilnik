import React from "react";
import RecipesButtons from "./RecipesButtons";
import SearchRecipesResults from "./SearchRecipesResults";

function Home() {
  return (
    <div className="home">
      <RecipesButtons />
      <SearchRecipesResults />
    </div>
  );
}

export default Home;
