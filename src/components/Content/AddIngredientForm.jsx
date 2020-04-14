import React from "react";
import { connect } from "react-redux";
import { putIngredientHolodilnik } from "../../store/actions";

const AddIngredientForm = connect((state) => ({
  holodilnik: state.ingredients.holodilnik,
}), {
  putIngredientHolodilnik,
})(class extends React.Component {
  state = {
    name: "",
    weight: "",
  };

  handleInputChange = (event, ingredient) => {
    const { value } = event.target;
    this.setState({ name: ingredient, weight: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.weight) return;
    const data = this.state;
    this.props.putIngredientHolodilnik(data, this.props.holodilnik);
  };

  render() {
    const { ingredient } = this.props;
    return (
      <form className="AddIngredientForm" id="AddIngredientForm" onSubmit={this.handleSubmit}>
        <label className="Ingredient" htmlFor="AddIngredientForm">
          {ingredient}
        </label>
        <label htmlFor="AddIngredientForm">
          <input
            className="InputIngredientForm"
            type="number"
            name="weight"
            min="1"
            value={ingredient.weight}
            onChange={(event) => this.handleInputChange(event, ingredient)}
          />
        </label>
        <input
          className="AddIngredientHolodilnik"
          type="submit"
          value="+"
          onClick={(event) => this.handleSubmit(event, ingredient)}
        />
      </form>
    );
  }
});

export default AddIngredientForm;
