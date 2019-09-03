import React from 'react';
export function SignIn() {
    return (
        <div>
            <p>Вход</p>
            <form className="SignInForm">
                <label>
                    <input type="email" placeholder="email"/>
                </label>
                <label>
                    <input type="password" placeholder="Пароль"/>
                </label>
                <input className="SignUpSubmit" type="submit" value="Войти"/>
            </form>
        </div>

    )
}