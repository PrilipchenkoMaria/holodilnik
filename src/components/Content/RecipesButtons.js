import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {goToRandomRecipe} from "../../store/actions";
import {compose} from "redux";


export const RecipesButtons = compose(
    connect(state => ({}), {goToRandomRecipe})

)(function (props) {

    return (
        <div className="RecipesButtons">
            <Link to="/find-recipes" className="FindRecipesButton">Найти рецепты</Link>
            <a onClick={props.goToRandomRecipe} className="RandomRecipeButton">Случайный рецепт</a>
            <Link to="/create-recipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    );
});
