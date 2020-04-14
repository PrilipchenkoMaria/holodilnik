import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { goToRandomRecipe } from "../../store/actions";


const RecipesButtons = compose(
  connect(null, { goToRandomRecipe }),
)((props) => (
  <div className="RecipesButtons">
    <Link to="/find-recipes" className="FindRecipesButton">Найти рецепты</Link>
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
