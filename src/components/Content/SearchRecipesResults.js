import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AllRecipes} from './AllRecipes';
import {RandomRecipe} from './RandomRecipe';
import {NoRequest} from './NoRequest';



export function SearchRecipesResults () {
    return (
        <div className="SearchRecipesResults">
            <Switch>
                <Route path='/AllRecipes' component={AllRecipes}/>
                <Route path='/RandomRecipe' component={RandomRecipe}/>
                <Route path='/NoRequest' component={NoRequest}/>
            </Switch>
        </div>
    )
}
