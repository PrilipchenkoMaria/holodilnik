import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import { refreshToken } from "../store/actions";
import Spin from "./Spin/Spin";

const OAuthResponse = (props) => {
  const { token } = props.match.params;
  useEffect(() => {
    props.refreshToken(token);
  });

  const { isFetching, errorMessage } = props;

  if (isFetching) {
    return (
      <div className="OAuth">
        <p>Идет проверка...</p>
        <Spin />
      </div>
    );
  }
  function getMessage() {
    if (errorMessage) return "Ошибка авторизации. Пожалуйста, повторите попытку.";
    if (!isFetching && !errorMessage) return "Что-то пошло не так. Пожалуйста, повторите попытку.";
    return null;
  }

  return (
    <div className="OAuth">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <p>{getMessage()}</p>
      <Link to="/sign-up" className="sign-up__button">Регистрация</Link>
      <Link to="/sign-in" className="sign-in__button">Войти</Link>
    </div>
  );
};

OAuthResponse.defaultProps = {
  errorMessage: null,
};

OAuthResponse.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  refreshToken: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool,
};

export default connect((state) => ({
  isFetching: state.auth.isFetching,
  errorMessage: state.auth.signInErrorMessage,
}), {
  refreshToken,
})(OAuthResponse);
