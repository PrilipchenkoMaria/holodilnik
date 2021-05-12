import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";
import { openModal, signInValidation } from "../../../store/actions";
import SocialNetworks from "./SocialNetworks";

// todo: сброс пароля по email

const SignIn = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const {
  // eslint-disable-next-line no-shadow
    isFetching, errorMessage, signInValidation, openModal,
  } = props;

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    signInValidation(state);
  }

  function openForgotPasswordModal() {
    openModal({ text: "", type: "forgotPassword" });
  }

  function getMessage() {
    if (isFetching) return <p>Проверка логина и пароля...</p>;
    if (errorMessage) return <p className="error-message">Неправильный логин или пароль</p>;
    return null;
  }

  return (
    <div className="sign-in">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h1>Вход</h1>
      <form className="sign-in__form" id="SignInForm" onSubmit={handleSubmit}>
        <label htmlFor="SignInForm">
          <input
            className="sign-in__form_input"
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="SignInForm">
          <input
            className="sign-in__form_input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </label>
        {getMessage()}
        <input className="sign-in__form_submit" type="submit" value="Войти" onClick={handleSubmit} />
      </form>
      <button type="button" onClick={openForgotPasswordModal} className="forgot-password-link">
        Не помню пароль...
      </button>
      <SocialNetworks />
    </div>
  );
};

SignIn.defaultProps = {
  errorMessage: null,
};

SignIn.propTypes = {
  signInValidation: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default connect((state) => ({
  isFetching: state.auth.isFetching,
  errorMessage: state.auth.signInErrorMessage,
}), {
  signInValidation,
  openModal,
})(SignIn);
