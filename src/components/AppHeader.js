import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';


function SignInForm({setVisibleForm}) {
    return <div className="SignInModal">
        <h1>Вход</h1>
        <form className="SignInForm">
            <label>
                <input className="SignInFormInput" type="email" placeholder="email"/>
            </label>
            <label>
                <input className="SignInFormInput" type="password" placeholder="Пароль"/>
            </label>
            <input className="SignInSubmit" type="submit" value="Войти"/>
        </form>
        <p>
            <a href="#" className="ForgotPasswordLink" onClick={() => setVisibleForm('forgot')}>
                Не помню пароль...
            </a>
        </p>

    </div>
}

function ForgotPasswordForm() {
    return <div className="SignInModal">
        <h1>Восстановление пароля</h1>
        <form className="ForgotPasswordForm">
            <label>
                Для сброса текущего пароля введите email:
                <input className="ForgotPasswordInput" type="email" placeholder="email"/>
            </label>
            <input className="ForgotPasswordSubmit" type="submit" value="Подтвердить"/>
        </form>
    </div>;
}


export class AppHeader extends React.Component {

    state = {
        isVisible: false,
        visibleForm: 'signIn',
    };

    toggleVisible = () => {
        this.setState({
            isVisible: !this.state.isVisible,
            visibleForm: 'signIn',
        })
    };

    setVisibleForm = (type) => {
        const allowedForms = ['signIn', 'forgot'];

        if (!allowedForms.includes(type)) {
            return;
        }

        this.setState({
            visibleForm: type,
        });
    };


    render() {
        return (
            <>
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <Link to="/SignUp" className="SignUpButton">Регистрация</Link>
                <a href="#" className="SignInButton" onClick={this.toggleVisible}>Войти</a>
                {this.renderForm()}
            </>
        );
    }

    renderForm() {
        if (!this.state.isVisible) return null;

        switch (this.state.visibleForm) {
            case "signIn":
                return <SignInForm setVisibleForm={this.setVisibleForm}/>;
            case "forgot":
                return <ForgotPasswordForm/>;
            default:
                return null;
        }
    }
}

