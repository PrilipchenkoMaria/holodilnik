import React from 'react';
import {Link} from 'react-router-dom';

export function RecipePreview() {
    return (
        <div className="RecipePreview">
            <Link to="/Recipe" className="FullRecipeLink"><h2>Название блюда</h2></Link>
            <p>Краткое оприсание</p>
            <p>Время приготовления "х" минут</p>
            <p>Количество порций "х"</p>
            <p>Ингридиенты: "х", "х", "х", "х"</p>
        </div>
    )
}