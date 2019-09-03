import React from 'react';
import {Link} from "react-router-dom";


export function AppHeader() {
    return (
        <>
            <Link to="/SignUp" className="SignUpButton">Регистрация</Link>
            <Link to="/SignIn" className="SignInButton">Вход</Link>
        </>

    );
}


