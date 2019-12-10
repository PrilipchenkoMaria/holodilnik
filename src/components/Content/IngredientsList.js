import React from "react";

export class IngredientsList extends React.Component {
    state = {
        ingredientsName: [],
        error: null,
        weight: "",
        measure: "g",
    };
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value}, () => console.table(this.state));
    };
    handleSubmit = (event) => {
        event.preventDefault();
    };

    componentDidMount() {


        fetch(`/api/recipes/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
            })
            .then(recipes => {
                return recipes.map((recipe) =>
                    recipe.ingredients,
                );
            })
            .then(ingredients => {
                let names = [];
                ingredients.forEach((ingredient) => {
                    ingredient.forEach((item) => names.push(item.name));
                });
                return names;
            })
            .then(ingredientsName => {
                return this.unique(ingredientsName);
            })
            .then(ingredientsName => {
                this.setState({ingredientsName});
            })
            .catch(error => {
                this.setState({error});
            });
    }

    render() {
        const {error, ingredientsName} = this.state;

        if (error) return error.message;
        if (!ingredientsName) return "Loading...";
        return (
            <div className="IngredientsList">
                {this.renderAddIngredientForm()}
            </div>
        );
    }

    renderAddIngredientForm() {
        const {ingredientsName} = this.state;
        return ingredientsName.map((ingredient, idx) =>
            <form className="CreateRecipeForm" key={idx} onSubmit={this.handleSubmit}>
                <label>
                    {ingredient}
                </label>
                <label>
                    <input
                        className="InputIngredientForm"
                        type="number"
                        name="weight"
                        min="0"
                        value={ingredient.weight}
                        onChange={event => this.handleInputChange}
                    />
                </label>
                <label>
                    <select className="InputIngredientForm"
                            name="measure"
                            value={ingredient.measure}
                            onChange={event => this.handleInputChange}>
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
                <input className="AddRecipeIngredient" type="submit" value="+"
                       onClick={this.handleSubmit}/>
            </form>,
        );
    }

    unique(arr) {
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }

        return result;
    }

}