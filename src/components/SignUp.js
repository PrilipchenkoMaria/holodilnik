import React from "react";
import Logo from "../img/AppHeaderBg.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signUpUser} from "../store/actions";


//todo: SocialNetworks

export const SignUp = connect(state => ({
    errorMessage: state.auth.signUpErrorMessage,
}), {
    signUpUser,
})(class extends React.Component {
    state = {
        login: "",
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
        this.props.signUpUser(this.state);
    };

    render() {
        const {isFetching, errorMessage} = this.props;
        let message;
        if (isFetching) message = <p>Проверка...</p>;
        if (errorMessage) message = <p className="ErrorMessage">Пользователь с таким email уже существует</p>;

        return (
            <div className="SignUpPage">
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <h1>Регистрация</h1>
                <form className="SignUpForm" onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            className="SignUpFormInput"
                            type="text"
                            placeholder="Имя пользователя"
                            name="login"
                            value={this.state.login}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        <input
                            className="SignUpFormInput"
                            type="email"
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        <input
                            className="SignUpFormInput"
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    {message}
                    <input className="SignUpSubmit" type="submit" value="Зарегистрироваться"
                           onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
});
