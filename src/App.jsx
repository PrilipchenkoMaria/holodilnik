import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import "./App.scss";
import AppHeader from "./components/AppHeader";
import CreateRecipe from "./components/Content/CreateRecipe";
import Home from "./components/Content/Home";
import IngredientsList from "./components/Content/IngredientsList";
import Recipe from "./components/Content/Recipe";
import SearchIngredient from "./components/Content/SearchIngredient";
import MarginalSidebar from "./components/MarginalSidebar/MarginalSidebar";
import OAuthResponse from "./components/OAuth";
import Modal from "./components/Modal/index";
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
          <Route path="/add-ingredients">
            <SearchIngredient />
            <IngredientsList />
          </Route>
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
      <Modal />
      <Switch>
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
