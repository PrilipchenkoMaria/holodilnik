import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppHeader} from './components/AppHeader';
import {MarginalSidebar} from './components/MarginalSidebar';
import {Home} from './components/Content/Home';
import {SignUp} from './components/SignUp';
import {SignIn} from './components/SignIn';
import {CreateRecipe} from './components/Content/CreateRecipe';



function Layout() {
    return <div className="App">
        <div className="Wrapper">
            <header className="AppHeader">
                <AppHeader/>
            </header>
            <aside className="MineIngredients">
                <MarginalSidebar/>
            </aside>
            <div className="Content">
                <Switch>
                    <Route path='/CreateRecipe' component={CreateRecipe}/>
                    <Route path='/' component={Home}/>

                </Switch>
            </div>
        </div>
    </div>;
}

export function App() {
    return (
        <Router>
            <Switch>
                <Route path='/SignUp' component={SignUp}/>
                <Route path='/SignIn' component={SignIn}/>
                <Route component={Layout}/>
            </Switch>
        </Router>
    );
}


export default App;
