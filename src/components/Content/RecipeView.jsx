import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { prepareRecipe } from "../../store/actions";
import FullRecipe from "./FullRecipe";

const RecipeView = (props) => {
  const { match: { params: { recipeId } }, ingredients, isFetching } = props;

  function handleRecipePrepare(event) {
    event.preventDefault();
    props.prepareRecipe(recipeId, ingredients);
  }

  return (
    <FullRecipe recipeId={recipeId}>
      <div className="recipe__ready-button">
        <button
          onClick={handleRecipePrepare}
          disabled={isFetching}
          className="recipe__form_submit"
          type="button"
        >
          Готово
        </button>
        <div
            // todo: rephrase that
          data-tooltip="Все ингредиенты которые используются в рецепте будут отняты от добавленых в холодильник"
          className="tooltip-icon"
        >?
        </div>
      </div>
    </FullRecipe>
  );
};

RecipeView.defaultProps = {
  ingredients: [],
};

RecipeView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
  prepareRecipe: PropTypes.func.isRequired,
};

export default connect((state) => ({
  ingredients: state.ingredients.holodilnik,
  isFetching: state.ingredients.isHolodilnikFetching,
}), {
  prepareRecipe,
})(RecipeView);
