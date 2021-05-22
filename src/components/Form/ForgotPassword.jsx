import React, { useState } from "react";
import { postPasswordResetRequest } from "../../services/HTTPService";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState(null);
  const [response, setResponse] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    postPasswordResetRequest(email)
      .then(({ status }) => setResponse(status === 200
        ? "Письмо для смены пароля отправлено."
        + " В случае если вы не видите письмо проверьте \"спам\""
        : "Пользователь не найден"))
      .catch(() => setResponse("Неизвестная ошибка, попробуйте сменить пароль позже"));
  }

  function handleChange(event) {
    event.preventDefault();
    setEmail(event.target.value);
  }

  return (
    <>
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
      <div className="forgot-password__info">{response}</div>
    </>
  );
};

export default ForgotPasswordForm;
