import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';

export function ForgotPassword() {
    return <div className="ForgotPassword">
        <Link to="/"><img src={Logo} alt="logo"/></Link>
        <h1>Восстановление пароля</h1>
        <form className="ForgotPasswordForm">
            <label>
                Для сброса текущего пароля введите email:
                <input className="ForgotPasswordInput" type="email" placeholder="email"/>
            </label>
            <Link to="/"><input className="ForgotPasswordSubmit" type="submit" value="Подтвердить"/></Link>
        </form>
    </div>;
}