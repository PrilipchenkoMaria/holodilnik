import React from 'react';
import Logo from "../img/AppHeaderBg.png";
import {Link} from "react-router-dom";

export class SignUp extends React.Component{
    state = {
        login: '',
        email: '',
        password: '',
        passwordRepeat: '',
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render()
    {
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
                    <label>
                        <input
                            className="SignUpFormInput"
                               type="password"
                               placeholder="Повтор пароля"
                               name="passwordRepeat"
                               value={this.state.passwordRepeat}
                               onChange={this.handleInputChange}
                        />
                    </label>
                    <Link to="/"><input className="SignUpSubmit" type="submit" value="Зарегистрироваться"/></Link>
                </form>
            </div>

        )
    }
}