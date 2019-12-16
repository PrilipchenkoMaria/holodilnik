import React from "react";
import {RecipePreview} from "./RecipePreview";
import {connect} from "react-redux";
import {goToRandomRecipe} from "../../store/actions";



export const RandomRecipe = connect(state => ({
    recipe: state.randomRecipe.recipe
}), {
    goToRandomRecipe
})(class extends React.Component {
    state = {
        recipe: null,
        error: null,
    };


    componentDidMount() {
        fetch(`/recipes/random`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json();
            })
            .then(recipe => {
                this.setState({recipe});
            })
            .catch(error => {
                this.setState({error});
            });
    }

    render() {
        const {error, recipe} = this.props;

        if (error) return error.message;
        if (!recipe) return <div onClick={this.props.goToRandomRecipe}>"Loading..."</div>;
        return (
            <>
                {RecipePreview(recipe)}
            </>
        );

    }

});