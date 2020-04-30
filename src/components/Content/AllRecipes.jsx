import React from "react";
import { getRecipes } from "../../services/HTTPService";
import RecipePreview from "./RecipePreview";

class AllRecipes extends React.Component {
  state = {
    recipes: null,
    error: null,
  };

  componentDidMount() {
    getRecipes()
      .then((res) => {
        if (res.message) this.setState({ error: res.message });
        else this.setState({ recipes: res });
      });
  }

  renderRecipes() {
    const { recipes } = this.state;
    return recipes.map((recipe) => (
      <div key={recipe.dishName}>
        {" "}
        {RecipePreview(recipe)}
      </div>
    ));
  }

  render() {
    const { error, recipes } = this.state;

    if (error) return error;
    if (!recipes) return "Loading...";
    return (
      <>
        {this.renderRecipes()}
      </>
    );
  }
}

export default AllRecipes;
