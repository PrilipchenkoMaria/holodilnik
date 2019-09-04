import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/AppHeaderBg.png';


function SignInForm() {
    return <div className="SignInModal">
        <h1>Вход</h1>
        <form className="SignInForm">
            <label>
                <input type="email" placeholder="email"/>
            </label>
            <label>
                <input type="password" placeholder="Пароль"/>
            </label>
            <input className="SignInSubmit" type="submit" value="Войти"/>
        </form>
    </div>;
}

export class AppHeader extends React.Component {

    state = {
        isSignInShown: false,
    };

    toggleSignIn() {
        this.setState({
            isSignInShown: !this.state.isSignInShown,
        })
    }

    render() {
        return (
            <>
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <Link to="/SignUp" className="SignUpButton">Регистрация</Link>
                <a href="#" className="SignInButton" onClick={() => this.toggleSignIn()}>Войти</a>
                {this.state.isSignInShown && <SignInForm/>}
            </>
        );
    }
}


