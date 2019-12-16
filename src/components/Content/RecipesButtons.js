import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {goToRandomRecipe} from "../../store/actions";


export const RecipesButtons = connect(state => ({}), {goToRandomRecipe})(function (props) {
    return (
        <div className="RecipesButtons">
            <Link to="/find-recipes" className="FindRecipesButton">Найти рецепты</Link>
            <Link onClick={props.goToRandomRecipe} className="RandomRecipeButton">Случайный рецепт</Link>
            <Link to="/create-recipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    );
});
