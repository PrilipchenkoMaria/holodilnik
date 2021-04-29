import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getUserIngredients,
  putIngredientHolodilnik,
  removeIngredientHolodilnik,
  updateIngredientHolodilnik,
} from "../../store/actions";
import Spin from "../Spin/Spin";
import "./MarginalSidebar.scss";

const MarginalSidebar = (props) => {
  const { isFetching, ingredients } = props;
  const [ingredientInputName, setIngredientInputName] = useState(null);
  useEffect(() => {
    if (ingredients.length === 0 && !isFetching && localStorage.token) props.getUserIngredients();
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const location = useLocation();

  function removeIngredient(ingredient) {
    props.removeIngredientHolodilnik(ingredient, ingredients);
  }

  function handleIngredientUpdate(event, ingredient) {
    event.preventDefault();
    props.updateIngredientHolodilnik(+event.target.weight.value, ingredient, ingredients);
    setIngredientInputName(null);
  }

  function onDragOver(event) {
    event.preventDefault();
    if (!isDragOver) setIsDragOver(true);
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = "move";
  }

  function onDragLeave() {
    setIsDragOver(false);
  }

  function onDrop(event) {
    const name = event.dataTransfer.getData("name");
    const weight = +event.dataTransfer.getData("weight");
    if (name && weight) {
      props.putIngredientHolodilnik({ name, weight }, ingredients);
    }
  }

  function renderIngredients() {
    function getOnSubmit(ingredient) {
      return (event) => handleIngredientUpdate(event, ingredient);
    }

    return ingredients.map((ingredient, idx) => {
      const image = new Image();
      image.src = `/ingredients_icons/${ingredient.name.replace("%", "%25")}.jpg`;
      function onDragStart(event) {
        event.dataTransfer.setDragImage(image, 0, 0);
      }
      function onDragEnd() {
        if (!isDragOver) removeIngredient(ingredient);
      }
      return (
        <div
          key={ingredient.name}
          className="user-ingredient"
          draggable
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
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
      );
    });
  }

  function getLink() {
    const addIngredientsLink = "/add-ingredients";
    return location.pathname === addIngredientsLink
      ? (
        <Link className="sidebar-header__link" to="/">
          &#8592;
        </Link>
      )
      : (
        <Link className="sidebar-header__link" to={addIngredientsLink}>
          +
        </Link>
      );
  }

  function getSidebarHeader() {
    return (
      <div className="sidebar-header">
        <h1>Холодильник</h1>
        {getLink()}
      </div>
    );
  }

  if (isFetching || !ingredients) return <Spin />;

  return (
    <div className="sidebar" onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
      {getSidebarHeader()}
      {ingredients.length > 0
      && (
        <div className="refrigerator">
          {renderIngredients()}
        </div>
      )}
    </div>
  );
};

MarginalSidebar.defaultProps = {
  ingredients: null,
};

MarginalSidebar.propTypes = {
  removeIngredientHolodilnik: PropTypes.func.isRequired,
  updateIngredientHolodilnik: PropTypes.func.isRequired,
  putIngredientHolodilnik: PropTypes.func.isRequired,
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
  putIngredientHolodilnik,
})(MarginalSidebar);
