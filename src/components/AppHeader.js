import React from "react";
import {Link} from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import {connect} from "react-redux";
import {signOutUser} from "../store/actions";

export const AppHeader = connect(state => ({
    userId: state.auth.userId,
}), {
    signOutUser,
})(class extends React.Component {

    handleClick = event => {
        event.preventDefault();
        localStorage.removeItem("token");
        this.props.signOutUser();
    };

    render() {
        const userId = this.props.userId;
        let buttons;
        if (userId) buttons = <a href onClick={this.handleClick} className="SignOutButton">Выйти</a>;
        if (!userId) buttons = <><Link to="/sign-up" className="SignUpButton">Регистрация</Link>
            <Link to="/sign-in" className="SignInButton">Войти</Link></>;
        return (
            <>
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                {buttons}
            </>
        );
    }
});

