import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SelectSearch from "react-select-search";
import { postRecipe } from "../../services/HTTPService";
import { getIngredients, openModal } from "../../store/actions";

// todo: remove react-select-search library
function getDefaultIngredient() {
  return {
    weight: 100,
    measure: "",
    name: "",
  };
}

const CreateRecipe = (props) => {
  const [state, setState] = useState({
    dishName: "",
    shortDescription: "",
    cookingTime: "0",
    portionsNumber: "1",
    description: "",
    ingredients: [getDefaultIngredient()],
  });

  const { isFetching, ingredientsList } = props;

  useEffect(() => {
    if (!ingredientsList && !isFetching) props.getIngredients();
  });

  function onIngredientNameChange(value, idx) {
    setState((prevState) => {
      const ingredients = prevState.ingredients.slice();
      ingredients[idx].name = value;
      return { ingredients };
    });
  }

  function onIngredientWeightChange(event, idx) {
    const { value } = event.target;
    setState((prevState) => {
      const ingredients = prevState.ingredients.slice();
      ingredients[idx].weight = +value;
      return { ingredients };
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function addIngredient() {
    setState((prevState) => ({
      ingredients: [...prevState.ingredients, getDefaultIngredient()],
    }));
  }

  function removeIngredient(idx) {
    const { ingredients } = state;
    if (ingredients.length === 1) {
      props.openModal({
        type: "message",
        text: "Необходимо добавить минимум один ингридиент",
      });
      return;
    }

    ingredients.splice(idx, 1);

    setState({ ingredients });
  }

  function renderIngredientForm(ingredient, idx) {
    return (
      <div key={`ingredient${idx}`}>
        <SelectSearch
          name="name"
          className="select-search-box select-search-box--multiple"
          value={ingredient.name}
          onChange={(value) => onIngredientNameChange(value, idx)}
          options={ingredientList()}
          placeholder="Найти ингридиент"
          search
        />
        <label htmlFor="CreateRecipeForm">
          <input
            className="recipe-form__small-input"
            type="number"
            name="weight"
            required
            min="1"
            value={ingredient.weight}
            onChange={(event) => onIngredientWeightChange(event, idx)}
          />
        </label>
        <button className="delete-ingredient__submit" type="button" onClick={() => removeIngredient(idx)}>–</button>
        <button className="add-ingredient__submit" type="button" onClick={addIngredient}>+</button>
      </div>
    );
  }

  function handleSubmit(event) {
    if (!isStateValid()) return;
    event.preventDefault();
    postRecipe(state)
      .then((res) => res.id)
      .then((id) => props.history.push(`/Recipe/${id}`));
  }

  function ingredientList() {
    const ingredients = [];
    if (props.ingredientsList) {
      props.ingredientsList.forEach((item) => {
        ingredients.push({
          name: item,
          value: item,
        });
      });
    }
    return ingredients;
  }

  function isStateValid() {
    return (state.dishName
      && state.shortDescription
      && state.cookingTime
      && state.description
      && state.portionsNumber !== null);
  }

  return (
    <div className="create-recipe">
      <h1>Добавление рецепта</h1>
      <form className="recipe-form" id="CreateRecipeForm" onSubmit={handleSubmit}>
        {/* dishname */}
        <div>
          <label htmlFor="CreateRecipeForm">
            Название блюда:
            <input
              className="recipe-form__input-text"
              type="text"
              name="dishName"
              required
              value={state.dishName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {/* short desc */}
        <div>
          <label htmlFor="CreateRecipeForm">
            Краткое описание:
            <textarea
              className="recipe-form__input_textarea"
              name="shortDescription"
              required
              value={state.shortDescription}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {/* cook time */}
        <div>
          <label htmlFor="CreateRecipeForm">
            Время приготовления:
            <input
              className="recipe-form__small-input"
              type="number"
              name="cookingTime"
              required
              min="0"
              value={state.cookingTime}
              onChange={handleInputChange}
            />
            (минут)
          </label>
        </div>
        {/* portions */}
        <div>
          <label htmlFor="CreateRecipeForm">
            Количество порций:
            <input
              className="recipe-form__small-input"
              type="number"
              name="portionsNumber"
              required
              min="1"
              value={state.portionsNumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <p>Ингредиенты:</p>
        {state.ingredients.map(renderIngredientForm)}
        <div>
          <label htmlFor="CreateRecipeForm">
            Процесс приготовления:
            <textarea
              className="recipe-form__input_textarea"
              name="description"
              required
              value={state.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <input
          className="create-recipe__form_submit"
          type="submit"
          value="Добавить рецепт"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

CreateRecipe.defaultProps = {
  ingredientsList: null,
};

CreateRecipe.propTypes = {
  openModal: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect((state) => ({
  isFetching: state.ingredients.isFetching,
  ingredientsList: state.ingredients.ingredients,
}), {
  openModal,
  getIngredients,
})(CreateRecipe);
