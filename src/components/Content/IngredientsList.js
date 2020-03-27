import React from "react";
import { connect } from "react-redux";
import { getIngredients } from "../../store/actions";
import { filterArr } from "../../services/FilterArr";

export const IngredientsList = connect(state => ({
    isFetching: state.ingredients.isFetching,
    ingredients: state.ingredients.ingredients,
    filterCondition: state.ingredients.filterCondition,
}), {
    getIngredients,
})(class extends React.Component {
    state = {
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
        const {isFetching, ingredients} = this.props;
        if (!ingredients && !isFetching) this.props.getIngredients();
    }

    render() {
        const {isFetching, ingredients} = this.props;
        if (!ingredients || isFetching) return "Loading...";
        return (
            <div className="IngredientsList">
                {this.renderAddIngredientForm()}
            </div>
        );
    }

    renderAddIngredientForm() {
        const {ingredients, filterCondition} = this.props;
        let arr;
        if (filterCondition) arr = filterArr(ingredients, filterCondition);
        else arr = ingredients;
        return arr.map((ingredient, idx) =>
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
                        onChange={this.handleInputChange}
                    />
                </label>
                <input className="AddRecipeIngredient" type="submit" value="+"
                       onClick={this.handleSubmit}/>
            </form>,
        );
    }
});
