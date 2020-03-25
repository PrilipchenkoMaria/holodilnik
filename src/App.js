import React from "react";
import "./App.scss";
import { Route, Router, Switch } from "react-router-dom";
import { WarningModal } from "./components/WarningModal";
import { AppHeader } from "./components/AppHeader";
import { MarginalSidebar } from "./components/MarginalSidebar";
import { Home } from "./components/Content/Home";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { CreateRecipe } from "./components/Content/CreateRecipe";
import { Recipe } from "./components/Content/Recipe";
import { ForgotPassword } from "./components/ForgotPassword";
import { history } from "./history";
import { connect } from "react-redux";
import { isAuthenticated } from "./store/actions";


function Layout() {
    return (

        <div className="App">
            <header className="AppHeader">
                <AppHeader/>
            </header>
            <aside className="MineIngredients">
                <MarginalSidebar/>
            </aside>
            <div className="Content">
                <Switch>
                    <Route path='/recipe/:recipeId' component={Recipe}/>
                    <Route path='/create-recipe' component={CreateRecipe}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>
        </div>
    );
}

export const App = connect(null, {
    isAuthenticated,
})(class extends React.Component {
    componentDidMount = () => {
        this.props.isAuthenticated();
    };
    render() {
        return (
            <Router history={history}>
                <WarningModal/>
                <Switch>
                    <Route path='/forgot-password' component={ForgotPassword}/>
                    <Route path='/sign-in' component={SignIn}/>
                    <Route path='/sign-up' component={SignUp}/>
                    <Route component={Layout}/>
                </Switch>
            </Router>
        );
    }
});
