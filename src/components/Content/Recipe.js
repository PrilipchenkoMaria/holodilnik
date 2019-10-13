import React from "react";


export class Recipe extends React.Component {
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
            <div className="Recipe">
                <h2>{recipe.dishName}</h2>
                <p>{recipe.cookingTime}</p>
                {this.renderIngredients()}
                <p>{recipe.portionsNumber}</p>
                <p>{recipe.description}</p>
            </div>
        );
    }

    renderIngredients() {
        const {recipe} = this.state;
        return recipe.ingredients.map(ingredient => <p>{ingredient.name}: {ingredient.amount}</p>);
    }
}