import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';


export function AppHeader() {

    return (
        <>
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            <Link to="/SignUp" className="SignUpButton">Регистрация</Link>
            <Link to="/SignIn" className="SignInButton">Войти</Link>

        </>
    );

}

