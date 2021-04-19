import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserIngredients, removeIngredientHolodilnik } from "../../store/actions";
import Spin from "../Spin/Spin";
import "./MarginalSidebar.scss";

const MarginalSidebar = connect((state) => ({
  ingredients: state.ingredients.holodilnik,
  isFetching: state.ingredients.isHolodilnikFetching,
}), {
  removeIngredientHolodilnik,
  getUserIngredients,
})((props) => {
  const { isFetching, ingredients } = props;
  useEffect(() => {
    if (ingredients.length === 0 && !isFetching && localStorage.token) props.getUserIngredients();
  });

  function removeIngredient(ingredient) {
    props.removeIngredientHolodilnik(ingredient, props.ingredients);
  }

  function renderIngredients() {
    return ingredients.map((ingredient) => (
      <div key={ingredient.name} className="user-ingredient">
        <button
          className="user-ingredient__delete"
          type="button"
          onClick={() => removeIngredient(ingredient)}
        >x
        </button>
        <img
          className="user-ingredient__image"
          src={`/ingredients_icons/${ingredient.name.replace("%", "%25")}.jpg`}
          alt={ingredient.name}
        />
        <div className="user-ingredient__text">
          <p>{ingredient.name}: {ingredient.weight}&nbsp;г</p>
        </div>
      </div>
    ));
  }

  if (ingredients.length === undefined) return <h1>Холодильник</h1>;
  if (isFetching || !ingredients) return <Spin />;
  return (
    <div>
      <h1>Холодильник</h1>
      <div className="refrigerator">
        {renderIngredients()}
      </div>
    </div>
  );
});

MarginalSidebar.defaultProps = {
  ingredients: null,
};

MarginalSidebar.propTypes = {
  removeIngredientHolodilnik: PropTypes.func.isRequired,
  getUserIngredients: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
};

export default MarginalSidebar;
