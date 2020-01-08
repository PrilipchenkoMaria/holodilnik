import React from "react";
import {Link} from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import {connect} from "react-redux";
import {signInValidation} from "../store/actions";

export const AppHeader = connect(state => ({
    userId: state.auth.userId,
}), {
    signInValidation,
})(function (props) {
    const userId = props.userId;
    let buttons;
    if (userId) buttons = <Link to="/sign-out" className="SignOutButton">Выйти</Link>;
    if (!userId) buttons = <><Link to="/sign-up" className="SignUpButton">Регистрация</Link>
                             <Link to="/sign-in" className="SignInButton">Войти</Link></>;
    return (
        <>
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            {buttons}
        </>
    );
});

