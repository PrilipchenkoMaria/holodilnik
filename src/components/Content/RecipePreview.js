import React from 'react';
import {Link} from 'react-router-dom';

export  class RecipePreview extends React.Component {
    state = {
        recipe: null,
        error: null,
    };

    componentDidMount() {
        const recipeId = this.props.match.params.recipeId;

        fetch(`/api/recipes/${recipeId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
            })
            .then(recipe => {
                this.setState({recipe});
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
        <div className="RecipePreview">
            <Link to="/Recipe" className="FullRecipeLink"><h2>{recipe.dishName}</h2></Link>
            <p>{recipe.shortDescription}</p>
            <p>{recipe.cookingTime}</p>
            <p>{recipe.portionsNumber}</p>
            {this.renderIngredients()}
        </div>
            )
    }
    renderIngredients() {
        const {recipe} = this.state;
        return recipe.ingredients.map(ingredient => <p>{ingredient.name}: {ingredient.weight} {ingredient.measure}</p>);
    }
}