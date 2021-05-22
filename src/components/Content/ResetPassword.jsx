import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import Logo from "../../img/AppHeaderBg.png";
import { putPasswordResetConfirm } from "../../services/HTTPService";
import { openModal } from "../../store/actions";
import ForgotPasswordForm from "../Form/ForgotPassword";

const ResetPassword = (props) => {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  let token;

  useEffect(() => {
    token = props.match.params.token;
  });

  function openSigninModal() {
    props.openModal({ text: "", type: "signin" });
  }

  function handleSubmit(event) {
    event.preventDefault();
    putPasswordResetConfirm(token, password)
      .then((res) => {
        if (res.status === 201) {
          openSigninModal();
          history.push("/");
        } else setError(true);
      })
      .catch(() => setError(true));
  }

  if (error) {
    return (
      <div className="forgot-password">
        <Link to="/"><img src={Logo} alt="logo" /></Link>
        <h2>Что-то пошло не так.</h2>
        <ForgotPasswordForm />
      </div>
    );
  }
  return (
    <div className="forgot-password">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <form className="forgot-password__form" id="ResetPasswordForm" onSubmit={handleSubmit}>
        <label htmlFor="ResetPasswordForm">
          Введите новый пароль:
          <input
            className="forgot-password__form_input"
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="forgot-password__form_submit" type="submit">
          Подтвердить
        </button>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  openModal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(null, {
  openModal,
})(ResetPassword);
