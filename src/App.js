import React from 'react';
import './App.scss';
import {AppHeader} from './components/AppHeader'

function App() {
    return (
        <div className="App">
            <div className="Wrapper">
                <AppHeader/>
                <aside className="MineIngredients">

                </aside>
                <div className="Content">
                    <div className="SearchIngredient">
                        <form>
                            <input type="search" className="SearchBar" placeholder="Найти ингридиент"/>
                            <input type="submit" value="Найти"/>
                        </form>
                    </div>
                    <div className="IngredientsList">

                    </div>
                    <div className="RecipesButtons">

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" className="ShowAllRecipesButton">Найти рецепты</a>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" className="RandomRecipeButton">Случайный рецепт</a>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" className="CreateRecipeButton">Добавить рецепт</a>

                    </div>
                    <div className="SearchRecipesResults">

                    </div>
                </div>
            </div>


        </div>
    );
}

export default App;
