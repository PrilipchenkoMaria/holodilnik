import React from "react";
import { connect } from "react-redux";
import RecipePreview from "./RecipePreview";
import { goToRandomRecipe } from "../../store/actions";


const RandomRecipe = connect((state) => ({
  isFetching: state.randomRecipe.isFetching,
  recipe: state.randomRecipe.recipe,
}), {
  goToRandomRecipe,
})(class extends React.Component {
  componentDidMount() {
    this.props.goToRandomRecipe(this.props.history);
  }

  render() {
    const { isFetching, recipe } = this.props;

    if (!recipe || isFetching) return "Loading...";
    return (
      <>
        {RecipePreview(recipe)}
      </>
    );
  }
});

export default RandomRecipe;
