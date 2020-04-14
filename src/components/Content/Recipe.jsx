import React from "react";


class Recipe extends React.Component {
  state = {
    recipe: null,
    error: null,
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;

    fetch(`/api/recipes/${recipeId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then((recipe) => {
        this.setState({ recipe });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  renderIngredients() {
    const { recipe } = this.state;
    return recipe.ingredients.map((ingredient) => (
      <p
        key={ingredient.name}
      >{ingredient.name}: {ingredient.weight} {ingredient.measure}
      </p>
    ));
  }

  render() {
    const { error, recipe } = this.state;

    if (error) return error.message;
    if (!recipe) return "Loading...";

    return (
      <div className="Recipe">
        <h2>{recipe.dishName}</h2>
        <p>Время приготовления: {recipe.cookingTime}</p>
        {this.renderIngredients()}
        <p>Количество порций: {recipe.portionsNumber}</p>
        <p>{recipe.description}</p>
      </div>
    );
  }
}

export default Recipe;
