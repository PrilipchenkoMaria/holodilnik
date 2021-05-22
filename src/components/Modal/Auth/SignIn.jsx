import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";
import { openModal } from "../../../store/actions";
import SocialNetworks from "./SocialNetworks";
import SignInForm from "../../Form/SignIn";

const SignIn = (props) => {
  function openForgotPasswordModal() {
    props.openModal({ text: "", type: "forgotPassword" });
  }

  function openSignupModal() {
    props.openModal({ text: "", type: "signup" });
  }

  return (
    <div className="sign-in">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h1>Вход</h1>
      <SignInForm />
      <SocialNetworks />
      <div className="to-other-modals">
        <button type="button" onClick={openSignupModal} className="to-other-modal__button">
          Зарегистрироваться
        </button>
        <button type="button" onClick={openForgotPasswordModal} className="to-other-modal__button">
          Не помню пароль...
        </button>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default connect(null, {
  openModal,
})(SignIn);
