import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../img/AppHeaderBg.png";

// todo: return to the login modal

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.info(email);
  }

  function handleChange(event) {
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
        <Link to="/"><input className="forgot-password__form_submit" type="submit" value="Подтвердить" /></Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
