import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { goToFilteredRecipes } from "../../store/actions";
import Spin from "../Spin/Spin";
import RecipePreview from "./RecipePreview";

const FilteredRecipes = (props) => {
  const { isFetching, recipes } = props;

  function renderRecipes() {
    return recipes.map((recipe) => (
      <div key={recipe.dishName}>
        {RecipePreview(recipe)}
      </div>
    ));
  }

  if (!recipes || isFetching) return <Spin />;
  if (recipes.length === 0) return "Недостаточно ингредиентов";
  return (
    <>
      {renderRecipes()}
    </>
  );
};

FilteredRecipes.defaultProps = {
  recipes: null,
};

FilteredRecipes.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    dishName: PropTypes.string,
  })),
};

export default connect((state) => ({
  recipes: state.filteredRecipes.recipes,
  isFetching: state.filteredRecipes.isFetching,
  ingredients: state.ingredients.holodilnik,
}), {
  goToFilteredRecipes,
})(FilteredRecipes);
