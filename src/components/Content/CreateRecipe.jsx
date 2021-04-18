import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import SelectSearch from "react-select-search";
import { postRecipe } from "../../services/HTTPService";
import { openIngredientModal, getIngredients } from "../../store/actions";

// todo: remove react-select-search library
function getDefaultIngredient() {
  return {
    weight: 1,
    measure: "",
    name: "",
  };
}

const CreateRecipe = connect((state) => ({
  isFetching: state.ingredients.isFetching,
  ingredientsList: state.ingredients.ingredients,
}), {
  openIngredientModal,
  getIngredients,
})(class extends React.Component {
  state = {
    dishName: "",
    shortDescription: "",
    cookingTime: "0",
    portionsNumber: "1",
    description: "",
    ingredients: [getDefaultIngredient()],
  };

  static defaultProps = {
    ingredientsList: null,
  };

  static propTypes = {
    openIngredientModal: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ingredientsList: PropTypes.arrayOf(PropTypes.string),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    const { isFetching, ingredientsList } = this.props;
    if (!ingredientsList && !isFetching) this.props.getIngredients();
  }

  onIngredientNameChange(value, idx) {
    this.setState((prevState) => {
      const ingredients = prevState.ingredients.slice();
      ingredients[idx].name = value;
      return { ingredients };
    });
  }

  onIngredientWeightChange(event, idx) {
    const { value } = event.target;
    this.setState((prevState) => {
      const ingredients = prevState.ingredients.slice();
      ingredients[idx].weight = +value;
      return { ingredients };
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  addIngredient = () => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, getDefaultIngredient()],
    }));
  };

  removeIngredient = (idx) => {
    const { ingredients } = this.state;
    if (ingredients.length === 1) {
      this.props.openIngredientModal();
      return;
    }

    ingredients.splice(idx, 1);

    this.setState({ ingredients });
  };

  renderIngredientForm = (ingredient, idx) => (
    <div key={idx}>
      <SelectSearch
        name="name"
        className="select-search-box select-search-box--multiple"
        value={ingredient.name}
        onChange={(value) => this.onIngredientNameChange(value, idx)}
        options={this.ingredientList()}
        placeholder="Найти ингридиент"
        search
      />
      <label htmlFor="CreateRecipeForm">
        <input
          className="SmallInputRecipeForm"
          type="number"
          name="weight"
          required
          min="0"
          value={ingredient.weight}
          onChange={(event) => this.onIngredientWeightChange(event, idx)}
        />
      </label>
      <button className="DeleteIngredient" type="button" onClick={() => this.removeIngredient(idx)}>–</button>
      <button className="AddIngredient" type="button" onClick={this.addIngredient}>+</button>
    </div>
  );

  handleSubmit = (event) => {
    if (!this.isStateValid()) return;
    event.preventDefault();
    const recipe = this.state;
    postRecipe(recipe)
      .then((res) => res.id)
      .then((id) => this.props.history.push(`/Recipe/${id}`));
  };

  ingredientList() {
    const ingredients = [];
    if (this.props.ingredientsList) {
      this.props.ingredientsList.forEach((item) => {
        ingredients.push({
          name: item,
          value: item,
        });
      });
    }
    return ingredients;
  }

  isStateValid() {
    return (this.state.dishName
      && this.state.shortDescription
      && this.state.cookingTime
      && this.state.description
      && this.state.portionsNumber !== null);
  }

  render() {
    return (
      <div className="CreateRecipe">
        <h1>Добавление рецепта</h1>
        <form className="CreateRecipeForm" id="CreateRecipeForm" onSubmit={this.handleSubmit}>
          {/* dishname */}
          <div>
            <label htmlFor="CreateRecipeForm">
              Название блюда:
              <input
                className="InputTextRecipeForm"
                type="text"
                name="dishName"
                required
                value={this.state.dishName}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          {/* short desc */}
          <div>
            <label htmlFor="CreateRecipeForm">
              Краткое описание:
              <textarea
                className="InputTextareaRecipeForm"
                name="shortDescription"
                required
                value={this.state.shortDescription}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          {/* cook time */}
          <div>
            <label htmlFor="CreateRecipeForm">
              Время приготовления:
              <input
                className="SmallInputRecipeForm"
                type="number"
                name="cookingTime"
                required
                min="0"
                value={this.state.cookingTime}
                onChange={this.handleInputChange}
              />
              (минут)
            </label>
          </div>
          {/* portions */}
          <div>
            <label htmlFor="CreateRecipeForm">
              Количество порций:
              <input
                className="SmallInputRecipeForm"
                type="number"
                name="portionsNumber"
                required
                min="1"
                value={this.state.portionsNumber}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <p>Ингредиенты:</p>
          {this.state.ingredients.map(this.renderIngredientForm)}
          <div>
            <label htmlFor="CreateRecipeForm">
              Процесс приготовления:
              <textarea
                className="InputTextareaRecipeForm"
                name="description"
                required
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <input
            className="CreateRecipeSubmit"
            type="submit"
            value="Добавить рецепт"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
});

export default CreateRecipe;
