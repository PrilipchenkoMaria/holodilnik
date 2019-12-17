import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {goToRandomRecipe} from "../../store/actions";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


export const RecipesButtons = compose(
    connect(state => ({}), {goToRandomRecipe}),
    withRouter,
)(function (props) {

    return (
        <div className="RecipesButtons">
            <Link to="/find-recipes" className="FindRecipesButton">Найти рецепты</Link>
            <a onClick={function () {props.goToRandomRecipe(props.history)}} className="RandomRecipeButton">Случайный рецепт</a>
            <Link to="/create-recipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    );
});
