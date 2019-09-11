import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';
import {SocialNetworks} from './SocialNetworks';

export class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
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

    render() {
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
                <Link to="/"><input className="SignInSubmit" type="submit" value="Войти"/></Link>
            </form>
            <SocialNetworks/>
            <Link to="/ForgotPassword" className="ForgotPasswordLink">
                Не помню пароль...
            </Link>
        </div>
    }
}