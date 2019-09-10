import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';


export function SignIn () {
    
    return <div className="SignInPage">
        <Link to="/"><img src={Logo} alt="logo"/></Link>
        <h1>Вход</h1>
        <form className="SignInForm">
            <label>
                <input className="SignInFormInput" type="email" placeholder="email"/>
            </label>
            <label>
                <input className="SignInFormInput" type="password" placeholder="Пароль"/>
            </label>
            <Link to="/"><input className="SignInSubmit" type="submit" value="Войти"/></Link>
        </form>
        <p>
            <Link to="/ForgotPassword" className="ForgotPasswordLink">
                Не помню пароль...
            </Link>
        </p>

    </div>
}