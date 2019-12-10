import React from 'react';
import {Link} from "react-router-dom";
import {RandomRecipe} from "./RandomRecipe";


export function RecipesButtons () {
    return (
        <div className="RecipesButtons">
            <Link to="/find-recipes" className="FindRecipesButton">Найти рецепты</Link>
            <Link to="/random-recipe" className="RandomRecipeButton">Случайный рецепт</Link>
            <Link to="/create-recipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    )
}