import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import "./App.scss";
import AppHeader from "./components/AppHeader";
import CreateRecipe from "./components/Content/CreateRecipe";
import Home from "./components/Content/Home";
import Recipe from "./components/Content/Recipe";
import ForgotPassword from "./components/ForgotPassword";
import MarginalSidebar from "./components/MarginalSidebar/MarginalSidebar";
import OAuthResponse from "./components/OAuth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WarningModal from "./components/WarningModal";
import history from "./history";
import { isAuthenticated } from "./store/actions";

function Layout() {
  return (
    <div className="app">
      <header className="app__header">
        <AppHeader />
      </header>
      <aside className="user-ingredients">
        <MarginalSidebar />
      </aside>
      <div>
        <Switch>
          <Route path="/recipe/:recipeId" component={Recipe} />
          <Route path="/create-recipe" component={CreateRecipe} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

const App = (props) => {
  useEffect(() => {
    props.isAuthenticated();
  });

  return (
    <Router history={history}>
      <WarningModal />
      <Switch>
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/OAuth/:token" component={OAuthResponse} />
        <Route component={Layout} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
};

export default connect(null, {
  isAuthenticated,
})(App);
