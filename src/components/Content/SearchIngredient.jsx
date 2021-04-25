import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { putIngredientsFilter } from "../../store/actions";

const SearchIngredient = connect(null, {
  putIngredientsFilter,
})(class extends React.Component {
  static propTypes = {
    putIngredientsFilter: PropTypes.func.isRequired,
  };

  state = {
    ingredientName: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.props.putIngredientsFilter(this.state.ingredientName));
  };

  render() {
    return (
      <div className="search-ingredient">
        <form>
          <input
            type="search"
            className="search-bar"
            placeholder="Найти ингридиент"
            name="ingredientName"
            value={this.state.ingredientName}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Найти" />
        </form>
      </div>
    );
  }
});

export default SearchIngredient;
