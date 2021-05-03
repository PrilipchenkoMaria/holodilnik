import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { goToRandomRecipe } from "../../store/actions";
import Spin from "../Spin/Spin";
import RecipePreview from "./RecipePreview";

const RandomRecipe = (props) => {
  const { isFetching, recipe } = props;

  useEffect(() => {
    if (!recipe && !isFetching) props.goToRandomRecipe();
  });

  if (!recipe || isFetching) return <Spin />;
  return (
    <>
      {RecipePreview(recipe)}
    </>
  );
};

RandomRecipe.defaultProps = {
  recipe: null,
};

RandomRecipe.propTypes = {
  goToRandomRecipe: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    dishName: PropTypes.string,
  }),
};

export default connect((state) => ({
  isFetching: state.randomRecipe.isFetching,
  recipe: state.randomRecipe.recipe,
}), {
  goToRandomRecipe,
})(RandomRecipe);
