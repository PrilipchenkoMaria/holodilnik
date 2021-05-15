import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";
import { openModal, signUpUser } from "../../../store/actions";
import SocialNetworks from "./SocialNetworks";

const SignUp = (props) => {
  const [state, setState] = useState({
    login: "",
    email: "",
    password: "",
  });

  const { isFetching, errorMessage } = props;

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.signUpUser(state);
  }

  function getMessage() {
    if (isFetching) return <p>Проверка...</p>;
    if (errorMessage) return <p className="error-message">Пользователь с таким email уже существует</p>;
    return null;
  }

  function openSigninModal() {
    props.openModal({ text: "", type: "signin" });
  }

  return (
    <div className="sign-up">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h1>Регистрация</h1>
      <form className="sign-up__form" id="SignUpForm" onSubmit={handleSubmit}>
        <label htmlFor="sign-up__form">
          <input
            className="sign-up__form_input"
            type="text"
            placeholder="Имя пользователя"
            name="login"
            value={state.login}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="SignUpForm">
          <input
            className="sign-up__form_input"
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="SignUpForm">
          <input
            className="sign-up__form_input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </label>
        {getMessage()}
        <input
          className="sign-up__form_submit"
          type="submit"
          value="Зарегистрироваться"
          onClick={handleSubmit}
        />
      </form>
      <SocialNetworks />
      <div className="to-other-modals">
        <button type="button" onClick={openSigninModal} className="to-other-modal__button">
          Войти
        </button>
      </div>
    </div>
  );
};

SignUp.defaultProps = {
  errorMessage: null,
};

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default connect((state) => ({
  errorMessage: state.auth.signUpErrorMessage,
  isFetching: state.auth.isFetching,
}), {
  signUpUser,
  openModal,
})(SignUp);
