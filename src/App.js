import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppHeader} from './components/AppHeader';
import {MarginalSidebar} from './components/MarginalSidebar';
import {Home} from './components/Content/Home';
import {SignUp} from './components/SignUp';
import {SignIn} from './components/SignIn';
import {CreateRecipe} from './components/Content/CreateRecipe';
import {Recipe} from './components/Content/Recipe';
import {ForgotPassword} from './components/ForgotPassword';


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
                    <Route path='/Recipe' component={Recipe}/>
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
                <Route path='/ForgotPassword' component={ForgotPassword}/>
                <Route path='/SignIn' component={SignIn}/>
                <Route path='/SignUp' component={SignUp}/>
                <Route component={Layout}/>
            </Switch>
        </Router>
    );
}


export default App;
