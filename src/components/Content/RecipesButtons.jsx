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
  <div className="RecipesButtons">
    <Link to="/all-recipes" className="FindRecipesButton">Все рецепты</Link>
    <button
      onClick={() => props.goToFilteredRecipes(props.ingredients)}
      className="FindRecipesButton"
      type="button"
    >Найти рецепты
    </button>
    <button
      onClick={props.goToRandomRecipe}
      className="RandomRecipeButton"
      type="button"
    >Случайный рецепт
    </button>
    <Link to="/create-recipe" className="CreateRecipeButton">Добавить рецепт</Link>
  </div>
));

export default RecipesButtons;
