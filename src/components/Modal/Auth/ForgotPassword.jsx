import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";
import { openModal } from "../../../store/actions";
import ForgotPasswordForm from "../../Form/ForgotPassword";

const ForgotPassword = (props) => {
  function openSigninModal() {
    props.openModal({ text: "", type: "signin" });
  }

  function openSignupModal() {
    props.openModal({ text: "", type: "signup" });
  }

  return (
    <div className="forgot-password">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h2>Восстановление пароля</h2>
      <ForgotPasswordForm />
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
