import React from "react";
import { connect } from "react-redux";
import { getIngredients } from "../../store/actions";
import AddIngredientForm from "./AddIngredientForm";


const IngredientsList = connect((state) => ({
  isFetching: state.ingredients.isFetching,
  ingredients: state.ingredients.ingredients,
  filterCondition: state.ingredients.filterCondition,
  holodilnik: state.ingredients.holodilnik,
}), {
  getIngredients,
})(class extends React.Component {
  componentDidMount() {
    const { isFetching, ingredients } = this.props;
    if (!ingredients && !isFetching) this.props.getIngredients();
  }

  searchFilter(ingredient) {
    const { filterCondition } = this.props;
    return ingredient.toLowerCase().includes(filterCondition.toLowerCase());
  }

  holodilnikFilter(ingredient) {
    const { holodilnik } = this.props;
    return !holodilnik.find(({ name }) => name === ingredient);
  }

  filterIngredients() {
    const { ingredients, filterCondition, holodilnik } = this.props;
    if (!ingredients && !filterCondition) return [];
    if (holodilnik && filterCondition) {
      return ingredients.filter((ingredient) => this.searchFilter(ingredient)
        && this.holodilnikFilter(ingredient));
    }
    if (holodilnik) {
      return ingredients.filter((ingredient) => this.holodilnikFilter(ingredient));
    }
    if (filterCondition) {
      return ingredients.filter((ingredient) => this.searchFilter(ingredient));
    }
    return ingredients;
  }

  render() {
    const { isFetching, ingredients } = this.props;
    if (!ingredients || isFetching) return "Loading...";
    const arr = this.filterIngredients();
    return (
      <div className="IngredientsList">
        {arr.map((ingredient) => <AddIngredientForm ingredient={ingredient} key={ingredient} />)}
      </div>
    );
  }
});

export default IngredientsList;
