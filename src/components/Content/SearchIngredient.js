import React from 'react';

export function SearchIngredient() {
    return (
        <div className="SearchIngredient">
            <form>
                <input type="search" className="SearchBar" placeholder="Найти ингридиент"/>
                <input type="submit" value="Найти"/>
            </form>
        </div>
    )
}