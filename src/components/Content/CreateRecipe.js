import React from "react";


function getDefaultIngredient() {
    return {
        weight: "",
        measure: "g",
        name: "",
    };
}

export class CreateRecipe extends React.Component {
    state = {
        dishName: "",
        shortDescription: "",
        cookingTime: "",
        portionsNumber: "",
        description: "",
        ingredients: [getDefaultIngredient()],
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value}, () => console.table(this.state));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state;
        let dataStringify = JSON.stringify(data);
        fetch("/api/recipes/", {
            method: "POST",
            body: dataStringify,
            headers: {"Content-Type": "application/json"},
        })
            .then(response => response.json())
            .then(result => result.id)
            .then(id => this.props.history.push(`/Recipe/${id}`));
    };

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
                                   type="number" name="cookingTime"
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
                                type="number" name="portionsNumber"
                                min="1"
                                value={this.state.portionsNumber}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
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
                <label>
                    Ингридиенты:
                    <input
                        type="search"
                        className="InputTextRecipeForm"
                        placeholder="Найти ингридиент"
                        name="name"
                        required
                        value={ingredient.name}
                        onChange={event => this.onIngredientChange(event, idx)}
                    />
                </label>
                <label>
                    <input
                        className="SmallInputRecipeForm"
                        type="number"
                        name="weight"
                        min="0"
                        value={ingredient.weight}
                        onChange={event => this.onIngredientChange(event, idx)}
                    />
                </label>
                <label>
                    <select className="SmallInputRecipeForm"
                            name="measure"
                            value={ingredient.measure}
                            onChange={event => this.onIngredientChange(event, idx)}>
                        <option value="g">г</option>
                        <option value="kg">кг</option>
                        <option value="piece">шт</option>
                        <option value="spoon">ст. л.</option>
                        <option value="tsp.">ч. л.</option>
                        <option value="glass">стак.</option>
                        <option value="ml">мл</option>
                        <option value="l">л</option>
                        <option value="to taste">по вкусу</option>
                    </select>
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
            alert("Необходимо добавить минимум один ингридиент");
            return;
        }

        ingredients.splice(idx, 1);

        this.setState({ingredients});
    };

    onIngredientChange(event, idx) {
        const {name, value} = event.target;

        const ingredients = this.state.ingredients.slice();

        ingredients[idx][name] = value;

        this.setState({ingredients}, () => console.table(this.state.ingredients));
    }
}
