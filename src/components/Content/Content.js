import React from 'react';
import {SearchIngredient} from './SearchIngredient'
import {IngredientsList} from './IngredientsList'
import {RecipesButtons} from './RecipesButtons'
import {SearchRecipesResults} from './SearchRecipesResults'

export function Content () {
    return (
        <div className="Content">
            <SearchIngredient/>
            <IngredientsList/>
            <RecipesButtons/>
            <SearchRecipesResults/>

        </div>
    )
}


