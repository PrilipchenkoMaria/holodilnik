import React from 'react';

export class CreateRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            dishName: '',
            shortDescription: '',
            cookingTime: '',
            portionsNumber: '',
            weight:'',
            searchIngredient: '',
            description: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddRecipeIngredient = this.handleAddRecipeIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleAddRecipeIngredient (event) {

        event.preventDefault();
    }
    handleSubmit (event) {

        event.preventDefault();
    }


    render() {
        return (
            <div className="CreateRecipe">
                <h1>Добавление рецепта</h1>
                <form className="CreateRecipeForm">
                    <label>
                        Название блюда:
                        <input className="InputTextRecipeForm" type="text" name="dishName" value={this.state.dishName} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Краткое описание:
                        <textarea className="InputTextareaRecipeForm" name="shortDescription" value={this.state.shortDescription} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Время приготовления:
                        <input className="InputNumberRecipeForm" type="number" name="cookingTime" value={this.state.cookingTime} onChange={this.handleInputChange}/>
                        (минут)
                    </label>
                    <label>
                        Количество порций:
                        <input className="InputNumberRecipeForm" type="number"  name="portionsNumber" value={this.state.portionsNumber} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Ингридиенты:
                        <input type="search" className="InputTextRecipeForm" placeholder="Найти ингридиент" name="searchIngredient" value={this.state.searchIngredient} onChange={this.handleInputChange}/>
                        <input className="InputNumberRecipeForm" type="number" name="weight" value={this.state.weight} onChange={this.handleInputChange}/> гр.
                        <input className="AddRecipeIngredient" type="submit" value="+"  onClick={this.handleAddRecipeIngredient}/>
                    </label>
                    <label>
                        Процесс приготовления:
                        <textarea className="InputTextareaRecipeForm" name="description" value={this.state.description} onChange={this.handleInputChange}/>
                    </label>
                    <input className="CreateRecipeSubmit" type="submit" value="Добавить рецепт" onClick={this.handleSubmit}/>
                </form>
            </div>

        )
    }
}