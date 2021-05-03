import React, { useEffect, useState } from "react";
import { getRecipes } from "../../services/HTTPService";
import Spin from "../Spin/Spin";
import RecipePreview from "./RecipePreview";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        if (res.message) setError(res.message);
        else setRecipes(res);
      });
  }, []);

  function renderRecipes() {
    return recipes.map((recipe) => (
      <div key={recipe.dishName}>
        {" "}
        {RecipePreview(recipe)}
      </div>
    ));
  }

  if (error) return error;
  if (!recipes) return <Spin />;

  return (
    <>
      {renderRecipes()}
    </>
  );
};

export default AllRecipes;
