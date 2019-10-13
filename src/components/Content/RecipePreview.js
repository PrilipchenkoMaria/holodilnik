import React from 'react';
import {Link} from 'react-router-dom';

export function RecipePreview() {
    const recipe = {
        "cookingTime": "30m",
            "description": "A teper dlinnoe.",
            "dishName": "Pizza with pochatochki",
            "id": 1,
            "ingredients": [
            {
                "name": "Corn pochatok",
                "amount": "1 piece"
            }
        ],
            "portionsNumber": 2,
            "shortDescription": "Vozmi kukuruzni pochatok."
    }
    return (
        <div className="RecipePreview">
            <Link to="/Recipe" className="FullRecipeLink"><h2>{ recipe.dishName }</h2></Link>
            <p>{ recipe.shortDescription }</p>
            <p>{ recipe.cookingTime }</p>
            <p>{ recipe.portionsNumber}</p>
            {renderIngredients()}
        </div>
    )
    function renderIngredients() {
        return recipe.ingredients.map(ingredient => <p>{ingredient.name}: {ingredient.amount}</p>);
    }
}