import React from 'react';
import {SearchIngredient} from './SearchIngredient'
import {IngredientsList} from './IngredientsList'
import {RecipesButtons} from './RecipesButtons'
import {SearchRecipesResults} from './SearchRecipesResults'
import {AllRecipes} from "./AllRecipes";
import {RandomRecipe} from "./RandomRecipe";
import {NoRequest} from "./NoRequest";

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

