import React from "react";
import RecipePreview from "./RecipePreview";

class AllRecipes extends React.Component {
  state = {
    recipes: null,
    error: null,
  };

  componentDidMount() {
    fetch("/api/recipes/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then((recipes) => {
        this.setState({ recipes });
      })
      .catch((error) => {
        this.setState({ error });
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

    if (error) return error.message;
    if (!recipes) return "Loading...";
    return (
      <>
        {this.renderRecipes()}
      </>
    );
  }
}

export default AllRecipes;
