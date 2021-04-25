import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { goToRandomRecipe, goToFilteredRecipes } from "../../store/actions";

const RecipesButtons = connect((state) => ({
  ingredients: state.ingredients.holodilnik,
}), {
  goToRandomRecipe,
  goToFilteredRecipes,
})((props) => (
  <div className="recipes-buttons">
    <Link to="/all-recipes" className="recipes-buttons__button">Все рецепты</Link>
    <button
      onClick={() => props.goToFilteredRecipes(props.ingredients)}
      className="recipes-buttons__button"
      type="button"
    >Найти рецепты
    </button>
    <button
      onClick={props.goToRandomRecipe}
      className="recipes-buttons__button"
      type="button"
    >Случайный рецепт
    </button>
    <Link to="/create-recipe" className="create-recipe-button">Добавить рецепт</Link>
  </div>
));

export default RecipesButtons;
