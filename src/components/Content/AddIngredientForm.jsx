import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { putIngredientHolodilnik } from "../../store/actions";

const AddIngredientForm = connect((state) => ({
  holodilnik: state.ingredients.holodilnik,
}), {
  putIngredientHolodilnik,
})(class extends React.Component {
  static defaultProps = {
    holodilnik: [],
  };

  static propTypes = {
    putIngredientHolodilnik: PropTypes.func.isRequired,
    holodilnik: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      weight: PropTypes.number,
    })),
    ingredient: PropTypes.string.isRequired,
  };

  state = {
    weight: 1,
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ weight: +value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.weight) return;
    const data = { name: this.props.ingredient, ...this.state };
    console.info(data);
    this.props.putIngredientHolodilnik(data, this.props.holodilnik);
  };

  render() {
    const { ingredient } = this.props;
    return (
      <form className="add-ingredient-form" id="AddIngredientForm" onSubmit={this.handleSubmit}>
        <label className="ingredient" htmlFor="AddIngredientForm">
          {ingredient}
        </label>
        <label htmlFor="AddIngredientForm">
          <input
            className="add-ingredient-form__input"
            type="number"
            name="weight"
            min="1"
            value={this.state.weight}
            onChange={this.handleInputChange}
          />
        </label>
        <input
          className="add-ingredient-form__submit"
          type="submit"
          value="+"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
});

export default AddIngredientForm;
