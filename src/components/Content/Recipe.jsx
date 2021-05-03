import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getRecipe } from "../../services/HTTPService";
import Spin from "../Spin/Spin";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { recipeId } = props.match.params;
    getRecipe(recipeId)
      .then((res) => {
        if (!res) setError("Такого рецепта не существует");
        else if (res.message) setError(res.message);
        else setRecipe(res);
      });
  });

  function renderIngredients() {
    return recipe.ingredients.map((ingredient) => (
      <p
        key={ingredient.name}
      >{ingredient.name}: {ingredient.weight} {ingredient.measure}
      </p>
    ));
  }

  if (error) return error;
  if (!recipe) return <Spin />;

  return (
    <div className="recipe">
      <h2>{recipe.dishName}</h2>
      <p>Время приготовления: {recipe.cookingTime}</p>
      {renderIngredients()}
      <p>Количество порций: {recipe.portionsNumber}</p>
      <p>{recipe.description}</p>
    </div>
  );
};

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default Recipe;
