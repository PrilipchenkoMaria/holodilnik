import React from 'react';
import {Link} from "react-router-dom";


export function AppHeader() {
    return (


        <>
            <img className="logo" alt="logo" src="/img/AppHeaderBg.png" width={333} height={70}/>

            <Link to="/SignUp" className="SignUpButton">Регистрация</Link>

            < Link to="/SignIn" className="SignInButton">Вход</Link>

        </>

    );
}


