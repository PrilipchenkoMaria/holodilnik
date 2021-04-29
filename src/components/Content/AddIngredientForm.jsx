import PropTypes from "prop-types";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { putIngredientHolodilnik } from "../../store/actions";

const AddIngredientForm = (props) => {
  const { ingredient, holodilnik } = props;
  const weightInput = useRef(null);
  const image = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const data = { name: props.ingredient, weight: +event.target.weight.value };
    props.putIngredientHolodilnik(data, holodilnik);
  }

  function onDragStart(event) {
    event.dataTransfer.setData("name", ingredient);
    event.dataTransfer.setData("weight", weightInput.current.value || "100");
    event.dataTransfer.setDragImage(image.current, 0, 0);
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = "all";
  }

  return (
    <div
      className="ingredient"
      draggable
      onDragStart={onDragStart}
    >
      <img
        className="ingredient__image"
        src={`/ingredients_icons/${ingredient.replace("%", "%25")}.jpg`}
        alt={ingredient}
        ref={image}
      />
      <div className="ingredient__text">
        {ingredient}
      </div>
      <form className="add-ingredient-form" id="AddIngredientForm" onSubmit={handleSubmit}>
        <input
          className="add-ingredient-form__input"
          type="number"
          name="weight"
          min="1"
          defaultValue="100"
          ref={weightInput}
        />
        <input
          className="add-ingredient-form__submit"
          type="submit"
          value="+"
        />
      </form>
    </div>
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
