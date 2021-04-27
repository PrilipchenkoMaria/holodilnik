import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import { openModal, signOutUser } from "../store/actions";

const AppHeader = (props) => {
  // eslint-disable-next-line no-shadow
  const { signOutUser, isAuthenticated, openModal } = props;

  function signOut(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    signOutUser();
  }

  function openAuthModal(type) {
    openModal({ text: "", type });
  }

  function getButtons() {
    if (isAuthenticated) {
      return <button onClick={signOut} type="button" className="sign-out__button">Выйти</button>;
    }
    return (
      <>
        <button onClick={() => openAuthModal("signup")} type="button" className="sign-up__button">Регистрация</button>
        <button onClick={() => openAuthModal("signin")} type="button" className="sign-in__button">Войти</button>
      </>
    );
  }

  return (
    <>
      <Link to="/" className="logo"><img src={Logo} alt="logo" /></Link>
      {getButtons()}
    </>
  );
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signOutUser: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default connect((state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}), {
  signOutUser,
  openModal,
})(AppHeader);
