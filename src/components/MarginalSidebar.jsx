import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { removeIngredientHolodilnik, getUserIngredients } from "../store/actions";

const MarginalSidebar = connect((state) => ({
  ingredients: state.ingredients.holodilnik,
  isFetching: state.ingredients.isHolodilnikFetching,
}), {
  removeIngredientHolodilnik,
  getUserIngredients,
})(class extends React.Component {
  static defaultProps = {
    ingredients: null,
  };

  static propTypes = {
    removeIngredientHolodilnik: PropTypes.func.isRequired,
    getUserIngredients: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      weight: PropTypes.number,
    })),
  };

  componentDidMount() {
    const { isFetching, ingredients } = this.props;
    if (ingredients.length === 0 && !isFetching && localStorage.token) this.props.getUserIngredients();
  }

  removeIngredient(ingredient) {
    this.props.removeIngredientHolodilnik(ingredient, this.props.ingredients);
  }

  renderIngredients = (ingredient, idx) => (
    <div key={idx}>
      <p>{ingredient.name}: {ingredient.weight} г</p>
      <button
        className="DeleteIngredient"
        type="button"
        onClick={() => this.removeIngredient(ingredient)}
      >–
      </button>
    </div>
  );

  render() {
    const { isFetching, ingredients } = this.props;
    if (ingredients.length === undefined) return <h1>Холодильник</h1>;
    if (isFetching || !ingredients) return "Loading...";
    return (
      <div>
        <h1>Холодильник</h1>
        {ingredients.map(this.renderIngredients)}
      </div>
    );
  }
});

export default MarginalSidebar;
