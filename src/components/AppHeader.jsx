import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../img/AppHeaderBg.png";
import { signOutUser } from "../store/actions";

const AppHeader = connect((state) => ({
  userId: state.auth.userId,
}), {
  signOutUser,
})(class extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    this.props.signOutUser();
  };

  render() {
    const { userId } = this.props;
    let buttons;
    if (userId) buttons = <button onClick={this.handleClick} type="button" className="SignOutButton">Выйти</button>;
    if (!userId) {
      buttons = (
        <>
          <Link to="/sign-up" className="SignUpButton">Регистрация</Link>
          <Link to="/sign-in" className="SignInButton">Войти</Link>
        </>
      );
    }
    return (
      <>
        <Link to="/" className="Logo"><img src={Logo} alt="logo" /></Link>
        {buttons}
      </>
    );
  }
});

export default AppHeader;
