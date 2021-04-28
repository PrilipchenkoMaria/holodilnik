import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { putIngredientHolodilnik } from "../../store/actions";

const AddIngredientForm = (props) => {
  const { ingredient, holodilnik } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const data = { name: props.ingredient, weight: event.target.weight.value };
    props.putIngredientHolodilnik(data, holodilnik);
  }

  return (
    <form className="add-ingredient-form" id="AddIngredientForm" onSubmit={handleSubmit}>
      <div className="ingredient">
        <img
          className="ingredient__image"
          src={`/ingredients_icons/${ingredient.replace("%", "%25")}.jpg`}
          alt={ingredient}
        />
        <div className="ingredient__text">
          <p>{ingredient}</p>
        </div>
      </div>
      <input
        className="add-ingredient-form__input"
        type="number"
        name="weight"
        min="1"
        defaultValue="1"
      />
      <input
        className="add-ingredient-form__submit"
        type="submit"
        value="+"
      />
    </form>
  );
};

AddIngredientForm.defaultProps = {
  holodilnik: [],
};

AddIngredientForm.propTypes = {
  putIngredientHolodilnik: PropTypes.func.isRequired,
  holodilnik: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
  ingredient: PropTypes.string.isRequired,
};

export default connect((state) => ({
  holodilnik: state.ingredients.holodilnik,
}), {
  putIngredientHolodilnik,
})(AddIngredientForm);
