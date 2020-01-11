import React from "react";
import {Link} from "react-router-dom";
import Logo from "../img/AppHeaderBg.png";
import {connect} from "react-redux";
import {signInValidation} from "../store/actions";

//todo: сброс пароля по email
//todo: SocialNetworks

export const SignIn = connect(state => ({
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.signInErrorMessage,
}), {
    signInValidation,
})(class extends React.Component {
    state = {
        email: "",
        password: "",
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signInValidation(this.state);
    };

    render() {
        const {isFetching, errorMessage} = this.props;
        let message;
        if (isFetching) message = <p>Проверка логина и пароля...</p>;
        if (errorMessage) message = <p className="ErrorMessage">Неправильный логин или пароль</p>;

        return <div className="SignInPage">
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            <h1>Вход</h1>
            <form className="SignInForm" onSubmit={this.handleSubmit}>
                <label>
                    <input
                        className="SignInFormInput"
                        type="email"
                        placeholder="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    <input
                        className="SignInFormInput"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </label>
                {message}
                <input className="SignInSubmit" type="submit" value="Войти" onClick={this.handleSubmit}/>
            </form>
            <Link to="/forgot-password" className="ForgotPasswordLink">
                Не помню пароль...
            </Link>
        </div>;
    }
});
