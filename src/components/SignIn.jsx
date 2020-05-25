import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../img/AppHeaderBg.png";
import { signInValidation } from "../store/actions";
import SocialNetworks from "./SocialNetworks";

// todo: сброс пароля по email

const SignIn = connect((state) => ({
  isFetching: state.auth.isFetching,
  errorMessage: state.auth.signInErrorMessage,
}), {
  signInValidation,
})(class extends React.Component {
  static defaultProps = {
    errorMessage: null,
  };

  static propTypes = {
    signInValidation: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  };

  state = {
    email: "",
    password: "",
  };

  handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signInValidation(this.state);
  };

  render() {
    const { isFetching, errorMessage } = this.props;
    let message;
    if (isFetching) message = <p>Проверка логина и пароля...</p>;
    if (errorMessage) message = <p className="ErrorMessage">Неправильный логин или пароль</p>;

    return (
      <div className="SignInPage">
        <Link to="/"><img src={Logo} alt="logo" /></Link>
        <h1>Вход</h1>
        <form className="SignInForm" id="SignInForm" onSubmit={this.handleSubmit}>
          <label htmlFor="SignInForm">
            <input
              className="SignInFormInput"
              type="email"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="SignInForm">
            <input
              className="SignInFormInput"
              type="password"
              placeholder="Пароль"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          {message}
          <input className="SignInSubmit" type="submit" value="Войти" onClick={this.handleSubmit} />
        </form>
        <Link to="/forgot-password" className="ForgotPasswordLink">
          Не помню пароль...
        </Link>
        <SocialNetworks />
      </div>
    );
  }
});

export default SignIn;
