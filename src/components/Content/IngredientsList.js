import React from "react";
import {connect} from "react-redux";
import {getIngredients} from "../../store/actions";
import {filterArr} from "../../services/FilterArr";
import {AddIngredientForm} from "./AddIngredientForm";

export const IngredientsList = connect(state => ({
    isFetching: state.ingredients.isFetching,
    ingredients: state.ingredients.ingredients,
    filterCondition: state.ingredients.filterCondition,
    holodilnik: state.ingredients.holodilnik
}), {
    getIngredients,
})(class extends React.Component {
    state = {
        name: "",
        weight: "",
    };

    componentDidMount() {
        const {isFetching, ingredients} = this.props;
        if (!ingredients && !isFetching) this.props.getIngredients();
    }

    render() {
        const {isFetching, ingredients, filterCondition, holodilnik} = this.props;
        if (!ingredients || isFetching) return "Loading...";
        let arr;
        if (filterCondition) arr = filterArr(ingredients, filterCondition);
        if (holodilnik) {
            arr = ingredients.filter(ingredient => !holodilnik.find(({name}) => name === ingredient));
        } else arr = ingredients;
        return (
            <div className="IngredientsList">
                {arr.map((ingredient) => <AddIngredientForm ingredient={ingredient} key={ingredient}/>)}
            </div>
        );
    }
});
