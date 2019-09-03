import React from 'react';

export function SignUp() {
    return (
        <div className="SignUpPage">
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
                <input className="SignUpSubmit" type="submit" value="Зарегистрироваться"/>
            </form>
        </div>

    )
}