import React from 'react';
import {Link} from "react-router-dom";
import {RandomRecipe} from "./RandomRecipe";


export function RecipesButtons () {
    return (
        <div className="RecipesButtons">
            <Link to="/AllRecipes" className="FindRecipesButton">Найти рецепты</Link>
            <Link to="/RandomRecipe" className="RandomRecipeButton">Случайный рецепт</Link>
            <Link to="/CreateRecipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    )
}