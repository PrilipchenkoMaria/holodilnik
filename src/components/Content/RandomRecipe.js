import React from "react";
import {RecipePreview} from "./RecipePreview";


export class RandomRecipe extends React.Component {
    state = {
        recipe: null,
        error: null,
    };

    getRandomRecipeId(recipes) {
        let minId = 1;
        let maxId = recipes.length;
        let rand = minId + Math.random() * (maxId + 1 - minId);
        return Math.floor(rand);
    }

    componentDidMount() {
        //ToDO: в HTTPService
        fetch(`/api/recipes/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
            })
            .then(recipes => {
                let recipeId = this.getRandomRecipeId(recipes);
                this.setState({recipe: recipes[recipeId]});
            })
            .catch(error => {
                this.setState({error});
            });
    }

    render() {
        const {error, recipe} = this.state;

        if (error) return error.message;
        if (!recipe) return "Loading...";
        return (
            <>
                {RecipePreview(recipe)}
            </>
        );

    }

}
