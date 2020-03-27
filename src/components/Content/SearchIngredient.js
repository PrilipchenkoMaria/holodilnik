import React from 'react';
import { connect } from "react-redux";
import { putIngredientsFilter } from "../../store/actions";

export const SearchIngredient = connect(null, {
    putIngredientsFilter,
})(class extends React.Component {
    state = {
        ingredientName: "",
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value}, () => this.props.putIngredientsFilter(this.state.ingredientName));
    };
    render() {
        return (
            <div className="SearchIngredient">
                <form>
                    <input
                        type="search"
                        className="SearchBar"
                        placeholder="Найти ингридиент"
                        name="ingredientName"
                        value={this.state.ingredientName}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" value="Найти"/>
                </form>
            </div>
        );
    }
});
