import React from 'react';

export function RecipesButtons () {
    return (
        <div className="RecipesButtons">

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="ShowAllRecipesButton">Найти рецепты</a>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="RandomRecipeButton">Случайный рецепт</a>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="CreateRecipeButton">Добавить рецепт</a>

        </div>
    )
}