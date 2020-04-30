import React from "react";
import PropTypes from "prop-types";
import { getRecipe } from "../../services/HTTPService";

class Recipe extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        recipeId: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    recipe: null,
    error: null,
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    getRecipe(recipeId)
      .then((res) => {
        if (!res) this.setState({ error: "Такого рецепта не существует" });
        else if (res.message) this.setState({ error: res.message });
        else this.setState({ recipe: res });
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

    if (error) return error;
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
