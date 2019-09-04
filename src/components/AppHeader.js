import React from 'react';
import {Link} from "react-router-dom";


export function AppHeader() {
    return (
        <>
            <Link to="/SignUp" className="SignUpButton">Регистрация</Link>
            <Link to="/SignIn" className="SignInButton">Войти</Link>
            <div className="SignInModal">
                <h1>Вход</h1>
                <form className="SignInForm">
                    <label>
                        <input type="email" placeholder="email"/>
                    </label>
                    <label>
                        <input type="password" placeholder="Пароль"/>
                    </label>
                    <input className="SignInSubmit" type="submit" value="Войти"/>
                </form>
            </div>
        </>

    );
}


