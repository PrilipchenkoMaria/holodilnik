import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';

export class ForgotPassword extends React.Component {
    state = {value: ''};
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return <div className="ForgotPassword">
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            <h1>Восстановление пароля</h1>
            <form className="ForgotPasswordForm" onSubmit={this.handleSubmit}>
                <label>
                    Для сброса текущего пароля введите email:
                    <input
                        className="ForgotPasswordInput"
                        type="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                </label>
                <Link to="/"><input className="ForgotPasswordSubmit" type="submit" value="Подтвердить"/></Link>
            </form>
        </div>;
    }
}