import React from 'react';

export function CreateRecipe() {
    return (
        <div className="CreateRecipe">
            <h1>Добавление рецепта</h1>
            <form className="CreateRecipeForm">
                <label>
                    Название блюда:
                    <input className="InputTextRecipeForm" type="text"/>
                </label>
                <label>
                    Краткое описание:
                    <textarea className="InputTextareaRecipeForm"/>
                </label>
                <label>
                    Время приготовления:
                    <input className="InputNumberRecipeForm" type="number"/>
                    (минут)
                </label>
                <label>
                    Количество порций:
                    <input className="InputNumberRecipeForm" type="number"/>
                </label>
                <label>
                    Ингридиенты:
                    <input type="search" className="InputTextRecipeForm" placeholder="Найти ингридиент"/>
                    <input className="InputNumberRecipeForm" type="number"/> гр.
                    <input className="AddRecipeIngredient" type="submit" value="+"/>
                </label>
                <label>
                    Процесс приготовления:
                    <textarea className="InputTextareaRecipeForm"/>
                </label>
                <input className="CreateRecipeSubmit" type="submit" value="Добавить рецепт"/>
            </form>
        </div>

    )
}