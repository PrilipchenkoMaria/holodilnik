import React from 'react';


export function Recipe() {
    const recipe={
        title: 'Dish name',
        cookingTime: 'Dish name',
        portionsNumber: 'Dish name',
        description: 'Dish name',
    }
    return (
        <div className="Recipe">
            <h2>{ recipe.title }</h2>
            <p>{ recipe.cookingTime}</p>
            <p>{ recipe.portionsNumber}</p>
            <p>{ recipe.description}</p>
        </div>

    )
}