import React from 'react';

export function CreateRecipe() {
    return (
        <div className="CreateRecipe">
            <h1>Добавление рецепта</h1>
            <form className="CreateRecipeForm">
                <label>
                    Название блюда:
                    <input type="text"/>
                </label>
                <label>
                    <p> Краткое описание:

                    </p>
                    <textarea/>
                </label>
                <label>
                    Время приготовления:
                    <input type="number"/>
                    (минут)
                </label>
                <label>
                    <br/>Количество порций:
                    <input type="number"/>
                </label>
                <label>
                    <br/>Ингридиенты:
                    <input type="search" placeholder="Найти ингридиент"/>
                    <input type="number"/> гр.
                </label>

                <label>
                    <p>Процесс приготовления:

                    </p>
                    <textarea/>
                </label>
                <input className="CreateRecipeSubmit" type="submit" value="Добавить рецепт"/>
            </form>
        </div>

    )
}