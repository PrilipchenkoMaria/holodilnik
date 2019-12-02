import React from "react";
import {RecipePreview} from "./RecipePreview";

export class AllRecipes extends React.Component {
    state = {
        recipe: null,
        error: null,
    };

    componentDidMount() {


        fetch(`/api/recipes/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
            })
            .then(recipes => {
                this.setState({recipes});
            })
            .catch(error => {
                this.setState({error});
            });
    }

    render() {
        const {error, recipes} = this.state;

        if (error) return error.message;
        if (!recipes) return "Loading...";
        return (
            <>
                {this.state.recipes.forEach(function (recipe){
                    RecipePreview (recipe)
                })}
            </>
        );
    }
}
