import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserIngredients, removeIngredientHolodilnik, updateIngredientHolodilnik } from "../../store/actions";
import Spin from "../Spin/Spin";
import "./MarginalSidebar.scss";

const MarginalSidebar = (props) => {
  const { isFetching, ingredients } = props;
  const [ingredientInputName, setIngredientInputName] = useState(null);
  useEffect(() => {
    if (ingredients.length === 0 && !isFetching && localStorage.token) props.getUserIngredients();
  });

  function removeIngredient(event, ingredient) {
    event.preventDefault();
    props.removeIngredientHolodilnik(ingredient, props.ingredients);
  }

  function handleIngredientUpdate(event, ingredient) {
    event.preventDefault();
    props.updateIngredientHolodilnik(event.target.weight.value, ingredient, props.ingredients);
    setIngredientInputName(null);
  }

  function renderIngredients() {
    function getOnSubmit(ingredient) {
      return (event) => handleIngredientUpdate(event, ingredient);
    }

    return ingredients.map((ingredient, idx) => (
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
        <div
          className="user-ingredient__text"
          onClick={() => setIngredientInputName(ingredient.name)}
          role="button"
          tabIndex={idx}
          onKeyPress={() => setIngredientInputName(ingredient.name)}
        >
          {
            ingredientInputName === ingredient.name
              ? (
                <form onSubmit={getOnSubmit(ingredient)}>
                  <input
                    className="user-ingredient__weight-input"
                    name="weight"
                    min="1"
                    required
                    type="number"
                    defaultValue={ingredient.weight}
                  />
                  <button className="user-ingredient__weight-input_submit" type="submit">Сохранить</button>
                </form>
              )
              : (<p>{ingredient.name}: {ingredient.weight}&nbsp;г</p>)
          }
        </div>
      </div>
    ));
  }

  if (!ingredients.length) return <h1>Холодильник</h1>;
  if (isFetching || !ingredients) return <Spin />;
  return (
    <div>
      <h1>Холодильник</h1>
      <div className="refrigerator">
        {renderIngredients()}
      </div>
    </div>
  );
};

MarginalSidebar.defaultProps = {
  ingredients: null,
};

MarginalSidebar.propTypes = {
  removeIngredientHolodilnik: PropTypes.func.isRequired,
  updateIngredientHolodilnik: PropTypes.func.isRequired,
  getUserIngredients: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    weight: PropTypes.number,
  })),
};

export default connect((state) => ({
  ingredients: state.ingredients.holodilnik,
  isFetching: state.ingredients.isHolodilnikFetching,
}), {
  removeIngredientHolodilnik,
  getUserIngredients,
  updateIngredientHolodilnik,
})(MarginalSidebar);
