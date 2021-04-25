import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../img/AppHeaderBg.png";
import { signOutUser } from "../store/actions";

const AppHeader = connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}), {
  signOutUser,
})(class extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signOutUser: PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    this.props.signOutUser();
  };

  render() {
    const { isAuthenticated } = this.props;
    let buttons;
    if (isAuthenticated) {
      buttons = <button onClick={this.handleClick} type="button" className="sign-out__button">Выйти</button>;
    }
    if (!isAuthenticated) {
      buttons = (
        <>
          <Link to="/sign-up" className="sign-up__button">Регистрация</Link>
          <Link to="/sign-in" className="sign-in__button">Войти</Link>
        </>
      );
    }
    return (
      <>
        <Link to="/" className="logo"><img src={Logo} alt="logo" /></Link>
        {buttons}
      </>
    );
  }
});

export default AppHeader;
