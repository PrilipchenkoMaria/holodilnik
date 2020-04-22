import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RecipePreview from "./RecipePreview";
import { goToRandomRecipe } from "../../store/actions";


const RandomRecipe = connect((state) => ({
  isFetching: state.randomRecipe.isFetching,
  recipe: state.randomRecipe.recipe,
}), {
  goToRandomRecipe,
})(class extends React.Component {
  static defaultProps = {
    recipe: null,
  };

  static propTypes = {
    goToRandomRecipe: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    recipe: PropTypes.shape({
      dishName: PropTypes.string,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

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