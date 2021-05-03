import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { putIngredientsFilter } from "../../store/actions";

const SearchIngredient = (props) => {
  const [ingredientName, setIngredientName] = useState("");

  function handleInputChange(event) {
    setIngredientName(event.target.value);
    props.putIngredientsFilter(ingredientName);
  }

  return (
    <div className="search-ingredient">
      <form>
        <input
          type="search"
          className="search-bar"
          placeholder="Найти ингридиент"
          name="ingredientName"
          value={ingredientName}
          onChange={handleInputChange}
        />
        <input type="submit" value="Найти" />
      </form>
    </div>
  );
};

SearchIngredient.propTypes = {
  putIngredientsFilter: PropTypes.func.isRequired,
};

export default connect(null, {
  putIngredientsFilter,
})(SearchIngredient);
