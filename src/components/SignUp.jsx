import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../img/AppHeaderBg.png";
import { signUpUser } from "../store/actions";


// todo: SocialNetworks

const SignUp = connect((state) => ({
  errorMessage: state.auth.signUpErrorMessage,
  isFetching: state.auth.isFetching,
}), {
  signUpUser,
})(class extends React.Component {
  static defaultProps = {
    errorMessage: null,
  };

  static propTypes = {
    signUpUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  };

  state = {
    login: "",
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
    this.props.signUpUser(this.state);
  };

  render() {
    const { isFetching, errorMessage } = this.props;
    let message;
    if (isFetching) message = <p>Проверка...</p>;
    if (errorMessage) message = <p className="ErrorMessage">Пользователь с таким email уже существует</p>;

    return (
      <div className="SignUpPage">
        <Link to="/"><img src={Logo} alt="logo" /></Link>
        <h1>Регистрация</h1>
        <form className="SignUpForm" id="SignUpForm" onSubmit={this.handleSubmit}>
          <label htmlFor="SignUpForm">
            <input
              className="SignUpFormInput"
              type="text"
              placeholder="Имя пользователя"
              name="login"
              value={this.state.login}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="SignUpForm">
            <input
              className="SignUpFormInput"
              type="email"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="SignUpForm">
            <input
              className="SignUpFormInput"
              type="password"
              placeholder="Пароль"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          {message}
          <input
            className="SignUpSubmit"
            type="submit"
            value="Зарегистрироваться"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
});

export default SignUp;
