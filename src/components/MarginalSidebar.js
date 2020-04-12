import React from 'react';
import {connect} from "react-redux";
import {removeIngredientHolodilnik, getUserIngredients} from "../store/actions";

export const MarginalSidebar = connect(state => ({
    ingredients: state.ingredients.holodilnik,
    isFetching: state.ingredients.isHolodilnikFetching,
}), {
    removeIngredientHolodilnik,
    getUserIngredients,
})(class extends React.Component {

    componentDidMount() {
        const {isFetching, ingredients} = this.props;
        if (ingredients.length === 0 && !isFetching && localStorage.token) this.props.getUserIngredients();
    }

    render() {
        if (this.props.isFetching) return "Loading...";
        return (
            <div>
                <h1>Холодильник</h1>
                {this.props.ingredients.map(this.renderIngredients)}
            </div>
        );
    }

    removeIngredient(ingredient) {
        this.props.removeIngredientHolodilnik(ingredient, this.props.ingredients);
    }

    renderIngredients = (ingredient, idx) => {
        return (
            <div key={idx}>
                <p>{ingredient.name}: {ingredient.weight} г</p>
                <a className="DeleteRecipeIngredient" onClick={() => this.removeIngredient(ingredient)}>–</a>
            </div>
        );
    };
});
