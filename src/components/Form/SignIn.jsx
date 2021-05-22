import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { signInValidation } from "../../store/actions";

const SignInForm = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const {
    isFetching, errorMessage,
  } = props;

  function handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.signInValidation(state);
  }

  function getMessage() {
    if (isFetching) return <p>Проверка логина и пароля...</p>;
    if (errorMessage) return <p className="error-message">Неправильный логин или пароль</p>;
    return null;
  }

  return (
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
      <input className="sign-in__form_submit" type="submit" value="Войти" onClick={handleSubmit}/>
    </form>
  );
};

SignInForm.defaultProps = {
  errorMessage: null,
};

SignInForm.propTypes = {
  signInValidation: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default connect((state) => ({
  isFetching: state.auth.isFetching,
  errorMessage: state.auth.signInErrorMessage,
}), {
  signInValidation,
})(SignInForm);
