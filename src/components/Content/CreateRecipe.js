import React from "react";
import {connect} from "react-redux";
import {openIngredientModal, getIngredients} from "../../store/actions";
import SelectSearch from 'react-select-search';

//todo: remove react-select-search library
function getDefaultIngredient() {
    return {
        weight: "0",
        measure: "",
        name: "",
    };
}
export const CreateRecipe = connect(state => ({
    isVisible: state.modal.isVisible,
    text: state.modal.text,
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

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value}, () => console.table(this.state));
    };

    handleSubmit = (event) => {
        if (!this.isStateValid()) return;
        event.preventDefault();
        const data = this.state;
        let dataStringify = JSON.stringify(data);
        fetch("/api/recipes/", {
            method: "POST",
            body: dataStringify,
            headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(result => result._id)
            .then(id => this.props.history.push(`/Recipe/${id}`));
    };

    componentDidMount() {
        const {isFetching, ingredientsList} = this.props;
        if (!ingredientsList && !isFetching) this.props.getIngredients();
    }

    render() {
        return (
            <div className="CreateRecipe">
                <h1>Добавление рецепта</h1>
                <form className="CreateRecipeForm" onSubmit={this.handleSubmit}>
                    {/* dishname */}
                    <div>
                        <label>
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
                        <label>
                            Краткое описание:
                            <textarea className="InputTextareaRecipeForm"
                                      name="shortDescription"
                                      required
                                      value={this.state.shortDescription}
                                      onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    {/* cook time */}
                    <div>
                        <label>
                            Время приготовления:
                            <input className="SmallInputRecipeForm"
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
                        <label>
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
                        <label>
                            Процесс приготовления:
                            <textarea className="InputTextareaRecipeForm"
                                      name="description"
                                      required
                                      value={this.state.description}
                                      onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <input className="CreateRecipeSubmit" type="submit" value="Добавить рецепт"
                           onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }

    renderIngredientForm = (ingredient, idx) => {
        return (
            <div key={idx}>
                <SelectSearch
                    name="name"
                    className="select-search-box select-search-box--multiple"
                    value={ingredient.name}
                    onChange={value => this.onIngredientNameChange(value, idx)}
                    options={this.ingredientList()}
                    placeholder="Найти ингридиент"
                    search
                />
                <label>
                    <input
                        className="SmallInputRecipeForm"
                        type="number"
                        name="weight"
                        required
                        min="0"
                        value={ingredient.weight}
                        onChange={event => this.onIngredientWeightChange(event, idx)}
                    />
                </label>
                <a className="DeleteRecipeIngredient" onClick={() => this.removeIngredient(idx)}>–</a>
                <a className="AddRecipeIngredients" onClick={this.addIngredient}>+</a>
            </div>
        );
    };

    addIngredient = () => {
        this.setState({ingredients: [...this.state.ingredients, getDefaultIngredient()]});
    };

    removeIngredient = (idx) => {
        const {ingredients} = this.state;
        if (ingredients.length === 1) {
            this.props.openIngredientModal();
            return;
        }

        ingredients.splice(idx, 1);

        this.setState({ingredients});
    };

    onIngredientNameChange(value, idx) {
        const name = "name";
        const ingredients = this.state.ingredients.slice();
        ingredients[idx][name] = value;
        this.setState({ingredients}, () => console.table(this.state.ingredients));
    }

    onIngredientWeightChange(event, idx) {
        const {value} = event.target;
        const name = "weight";
        const ingredients = this.state.ingredients.slice();
        ingredients[idx][name] = value;
        this.setState({ingredients}, () => console.table(this.state.ingredients));
    }

    ingredientList (){
        let ingredients = [];
        if (this.props.ingredientsList) {
            this.props.ingredientsList.forEach(item => {
                ingredients.push({
                    name: item,
                    value: item
                })
            })
        }
        return ingredients
    }

    isStateValid() {
        return (this.state.dishName
            && this.state.shortDescription
            && this.state.cookingTime
            && this.state.description
            && this.state.portionsNumber !== null);
    }
});
