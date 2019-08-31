import React from 'react';

export function AppHeader() {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <
            header className="AppHeader">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,react/react-in-jsx-scope */}
            <a href="" className="SignUpButton">Регистрация</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,react/react-in-jsx-scope */}
            <a href="" className="SignInButton">Вход</a>
        </header>
    );
}


