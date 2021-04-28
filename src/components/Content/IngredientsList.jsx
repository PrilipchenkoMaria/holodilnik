import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getIngredients } from "../../store/actions";
import Spin from "../Spin/Spin";
import AddIngredientForm from "./AddIngredientForm";

const IngredientsList = (props) => {
  const {
    isFetching, ingredients, filterCondition, holodilnik,
  } = props;

  useEffect(() => {
    if (!ingredients && !isFetching) props.getIngredients();
  });

  function searchFilter(ingredient) {
    return ingredient.toLowerCase().includes(filterCondition.toLowerCase());
  }

  function holodilnikFilter(ingredient) {
    return !holodilnik.find(({ name }) => name === ingredient);
  }

  function filterIngredients() {
    if (!ingredients && !filterCondition) return [];
    if (holodilnik && filterCondition) {
      return ingredients.filter((ingredient) => searchFilter(ingredient)
        && holodilnikFilter(ingredient));
    }
    if (holodilnik) {
      return ingredients.filter((ingredient) => holodilnikFilter(ingredient));
    }
    if (filterCondition) {
      return ingredients.filter((ingredient) => searchFilter(ingredient));
    }
    return ingredients;
  }

  if (!ingredients || isFetching) return <Spin />;
  const filteredIngredients = filterIngredients();
  return (
    <div className="ingredients-list">
      {filteredIngredients.map((ingredient) => <AddIngredientForm ingredient={ingredient} key={ingredient} />)}
    </div>
  );
};

IngredientsList.defaultProps = {
  ingredients: null,
  filterCondition: null,
  holodilnik: [],
};

IngredientsList.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  filterCondition: PropTypes.string,
  holodilnik: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
};

export default connect((state) => ({
  isFetching: state.ingredients.isFetching,
  ingredients: state.ingredients.ingredients,
  filterCondition: state.ingredients.filterCondition,
  holodilnik: state.ingredients.holodilnik,
}), {
  getIngredients,
})(IngredientsList);
