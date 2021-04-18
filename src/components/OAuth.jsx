import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import { refreshToken } from "../store/actions";

const OAuthResponse = connect((state) => ({
  isFetching: state.auth.isFetching,
  errorMessage: state.auth.signInErrorMessage,
}), {
  refreshToken,
})(class extends React.Component {
  static defaultProps = {
    errorMessage: null,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string,
      }),
    }).isRequired,
    refreshToken: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.bool,
  };

  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.refreshToken(token);
  }

  render() {
    const { isFetching, errorMessage } = this.props;
    let message;
    if (isFetching) {
      return (
        <div className="OAuthPage">
          <p>Идет проверка...</p>
        </div>
      );
    }
    if (errorMessage) message = "Ошибка авторизации. Пожалуйста, повторите попытку.";
    if (!isFetching && !errorMessage) message = "Что-то пошло не так. Пожалуйста, повторите попытку.";
    return (
      <div className="OAuthPage">
        <Link to="/"><img src={Logo} alt="logo" /></Link>
        <p>{message}</p>
        <Link to="/sign-up" className="SignUpButton">Регистрация</Link>
        <Link to="/sign-in" className="SignInButton">Войти</Link>
      </div>
    );
  }
});

export default OAuthResponse;
