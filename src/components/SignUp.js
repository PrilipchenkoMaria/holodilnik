import React from 'react';
import Logo from "../img/AppHeaderBg.png";
import {Link} from "react-router-dom";

export function SignUp() {
    return (
        <div className="SignUpPage">
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            <h1>Регистрация</h1>
            <form className="SignUpForm">
                <label>
                    <input type="text" placeholder="Имя пользователя"/>
                </label>
                <label>
                    <input type="email" placeholder="email"/>
                </label>
                <label>
                    <input type="password" placeholder="Пароль"/>
                </label>
                <label>
                    <input type="password" placeholder="Повтор пароля"/>
                </label>
                <Link to="/"><input className="SignUpSubmit" type="submit" value="Зарегистрироваться"/></Link>
            </form>
            <Link to="/"><p>Не помню пароль...</p></Link>
        </div>

    )
}