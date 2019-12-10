import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AllRecipes} from './AllRecipes';
import {RandomRecipe} from './RandomRecipe';
import {NoRequest} from './NoRequest';



export function SearchRecipesResults () {
    return (
        <div className="SearchRecipesResults">
            <Switch>
                <Route path='/find-recipes' component={AllRecipes}/>
                <Route path='/random-recipe' component={RandomRecipe}/>
                <Route path='/no-request' component={NoRequest}/>
            </Switch>
        </div>
    )
}
