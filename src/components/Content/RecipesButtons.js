import React from 'react';
import {Link} from "react-router-dom";


export function RecipesButtons () {
    return (
        <div className="RecipesButtons">
            <Link to="/AllRecipes" className="ShowAllRecipesButton">Найти рецепты</Link>
            <Link to="/RandomRecipe" className="RandomRecipeButton">Случайный рецепт</Link>
            <Link to="/CreateRecipe" className="CreateRecipeButton">Добавить рецепт</Link>
        </div>
    )
}