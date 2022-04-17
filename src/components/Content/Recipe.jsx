import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRecipe } from "../../services/HTTPService";
import { prepareRecipe } from "../../store/actions";
import Spin from "../Spin/Spin";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { match: { params: { recipeId } }, ingredients, isFetching } = props;

  useEffect(() => {
    getRecipe(recipeId)
      .then((res) => {
        if (!res) setError("Такого рецепта не существует");
        else if (res.message) setError(res.message);
        else setRecipe(res);
      });
  }, []);

  function handleRecipePrepare(event) {
    event.preventDefault();
    props.prepareRecipe(recipeId, ingredients);
  }

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
      <div className="recipe__ready-button">
        <button
          onClick={handleRecipePrepare}
          disabled={isFetching}
          className="recipe__form_submit"
          type="button"
        >
          Готово
        </button>
        <div
          // todo: rephrase that
          data-tooltip="Все ингредиенты которые используются в рецепте будут отняты от добавленых в холодильник"
          className="tooltip-icon"
        >?
        </div>
      </div>

    </div>
  );
};

Recipe.defaultProps = {
  ingredients: [],
};

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
  prepareRecipe: PropTypes.func.isRequired,
};

export default connect((state) => ({
  ingredients: state.ingredients.holodilnik,
  isFetching: state.ingredients.isHolodilnikFetching,
}), {
  prepareRecipe,
})(Recipe);
