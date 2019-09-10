import React from 'react';

export class CreateRecipe extends React.Component {
    state = {
        dishName: '',
        shortDescription: '',
        cookingTime: '',
        portionsNumber: '',
        weight: '',
        measure: 'g',
        ingredient: '',
        description: '',
        ingredients: [],
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    };

    handleSubmit = (event) => {

        event.preventDefault();
    };

    render() {
        return (
            <div className="CreateRecipe">
                <h1>Добавление рецепта</h1>
                <form id="ingredient-form" onSubmit={this.onIngredientSubmit}/>
                <form className="CreateRecipeForm">
                    <div>
                        <label>
                            Название блюда:
                            <input
                                className="InputTextRecipeForm"
                                type="text"
                                name="dishName"
                                value={this.state.dishName}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Краткое описание:
                            <textarea className="InputTextareaRecipeForm"
                                      name="shortDescription"
                                      value={this.state.shortDescription}
                                      onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Время приготовления:
                            <input className="InputNumberRecipeForm"
                                   type="number" name="cookingTime"
                                   value={this.state.cookingTime}
                                   onChange={this.handleInputChange}
                            />
                            (минут)
                        </label>
                    </div>
                    <div>
                        <label>
                            Количество порций:
                            <input
                                className="InputNumberRecipeForm"
                                type="number" name="portionsNumber"
                                value={this.state.portionsNumber}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    {this.renderAddedIngredients()}
                    {this.renderIngredientsForm()}
                    <div>
                        <label>
                            Процесс приготовления:
                            <textarea className="InputTextareaRecipeForm"
                                      name="description"
                                      value={this.state.description}
                                      onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <input className="CreateRecipeSubmit" type="submit" value="Добавить рецепт"
                           onClick={this.handleSubmit}/>
                </form>
            </div>

        )
    }

    renderIngredientsForm() {
        return (
            <div>
                <label>
                    Ингридиенты:
                    <input
                        form="ingredient-form"
                        type="search"
                        className="InputTextRecipeForm"
                        placeholder="Найти ингридиент"
                        name="ingredient"
                        value={this.state.ingredient}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                <input
                    form="ingredient-form"
                    className="InputNumberRecipeForm"
                    type="number"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleInputChange}
                />
                </label>
                <label>
                    <select className="InputNumberRecipeForm"
                            name="measure"
                            value={this.state.measure}
                            onChange={this.handleInputChange}>
                        <option value="g">г</option>
                        <option value="kg">кг</option>
                        <option value="piece">шт</option>
                        <option value="spoon">ст. л.</option>
                        <option value="tsp.">ч. л.</option>
                        <option value="glass">стак.</option>
                        <option value="ml">мл</option>
                        <option value="l">л</option>
                    </select>
                </label>
                <input
                    form="ingredient-form"
                    className="AddRecipeIngredient"
                    type="submit"
                    value="+"
                />
            </div>
        );
    }

    renderAddedIngredients() {
        return this.state.ingredients.map(ingredient => <p>{ingredient.name}: {ingredient.weight} {ingredient.measure}</p>);
    }

    onIngredientSubmit = (event) => {
        event.preventDefault();

        const {
            ingredients,
            ingredient,
            weight,
            measure,
        } = this.state;

        if (!ingredient || !weight) return;

        this.setState({
            ingredients: [
                ...ingredients,
                {
                    name: ingredient,
                    weight: weight,
                    measure: measure,
                },
            ],
        })
    }
}