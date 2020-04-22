import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { goToFilteredRecipes } from "../../store/actions";
import RecipePreview from "./RecipePreview";

const FilteredRecipes = connect((state) => ({
  recipes: state.filteredRecipes.recipes,
  isFetching: state.filteredRecipes.isFetching,
  ingredients: state.ingredients.holodilnik,
}), {
  goToFilteredRecipes,
})(class extends React.Component {
  static defaultProps = {
    recipes: null,
  };

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
      dishName: PropTypes.string,
    })),
  };

  renderRecipes() {
    const { recipes } = this.props;
    return recipes.map((recipe) => (
      <div key={recipe.dishName}>
        {" "}
        {RecipePreview(recipe)}
      </div>
    ));
  }

  render() {
    const { isFetching, recipes } = this.props;
    if (!recipes || isFetching) return "Loading...";
    if (recipes.length === 0) return "Недостаточно ингредиентов";
    return (
      <>
        {this.renderRecipes()}
      </>
    );
  }
});

export default FilteredRecipes;
