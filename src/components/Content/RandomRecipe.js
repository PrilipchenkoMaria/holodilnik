import React from "react";
import {RecipePreview} from "./RecipePreview";
import {connect} from "react-redux";
import {goToRandomRecipe} from "../../store/actions";


export const RandomRecipe = connect(state => ({
    isFetching: state.randomRecipe.isFetching,
    recipe: state.randomRecipe.recipe,
}), {
    goToRandomRecipe,
})(class extends React.Component {
    componentDidMount() {
        this.props.goToRandomRecipe(this.props.history);
    }

    render() {
        const {isFetching, recipe} = this.props;

        if (!recipe || isFetching) return "Loading...";
        return (
            <>
                {RecipePreview(recipe)}
            </>
        );
    }
});
