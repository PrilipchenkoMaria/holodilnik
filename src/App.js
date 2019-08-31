import React from 'react';
import './App.scss';
import {AppHeader} from './components/AppHeader'
import {MineIngredients} from './components/MineIngredients'
import {Content} from './components/Content/Content'

function App() {
    return (
        <div className="App">
            <div className="Wrapper">
                <AppHeader/>
                <MineIngredients/>
                <Content/>
            </div>
        </div>
    );
}

export default App;
