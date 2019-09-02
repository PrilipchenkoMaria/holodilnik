import React from 'react';
import {SearchIngredient} from './SearchIngredient'
import {IngredientsList} from './IngredientsList'
import {RecipesButtons} from './RecipesButtons'
import {SearchRecipesResults} from './SearchRecipesResults'


export function Home() {
    return (
        <>
            <SearchIngredient/>
            <IngredientsList/>
            <RecipesButtons/>
            <SearchRecipesResults/>
        </>
    )
}

