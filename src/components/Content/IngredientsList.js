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

        fetch(`/api/ingredients/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
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
                <label className="Ingredient">
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
                <input className="AddRecipeIngredient" type="submit" value="+"
                       onClick={this.handleSubmit}/>
            </form>,
        );
    }
}
