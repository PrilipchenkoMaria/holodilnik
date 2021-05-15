import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";
import { openModal } from "../../../store/actions";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.info(email);
  }

  function openSigninModal() {
    props.openModal({ text: "", type: "signin" });
  }

  function openSignupModal() {
    props.openModal({ text: "", type: "signup" });
  }

  function handleChange(event) {
    event.preventDefault();
    setEmail(event.target.value);
  }

  return (
    <div className="forgot-password">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h1>Восстановление пароля</h1>
      <form className="forgot-password__form" id="ForgotPasswordForm" onSubmit={handleSubmit}>
        <label htmlFor="ForgotPasswordForm">
          Для сброса текущего пароля введите email:
          <input
            className="forgot-password__form_input"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
        </label>
        <button className="forgot-password__form_submit" type="submit">
          Подтвердить
        </button>
      </form>
      <div className="to-other-modals">
        <button type="button" onClick={openSignupModal} className="to-other-modal__button">
          Зарегистрироваться
        </button>
        <button type="button" onClick={openSigninModal} className="to-other-modal__button">
          Войти
        </button>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default connect(null, {
  openModal,
})(ForgotPassword);
