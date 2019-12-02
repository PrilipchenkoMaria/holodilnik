import React from 'react';
import {Link} from 'react-router-dom';

export function RecipePreview(recipe) {

    return (
        <div className="RecipePreview">
            <Link to="/Recipe" className="FullRecipeLink"><h2>{ recipe.dishName }</h2></Link>
            <p>{ recipe.shortDescription }</p>
            <p>Время приготовления: { recipe.cookingTime }</p>
            <p>Количество порций: { recipe.portionsNumber}</p>
            {renderIngredients()}
        </div>
    )
    function renderIngredients() {
        return recipe.ingredients.map(ingredient => <p>{ingredient.name}: {ingredient.weight} {ingredient.measure}</p>);
    }
}