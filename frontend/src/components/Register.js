import React, {useState} from "react";
import {Link} from "react-router-dom";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(e) {
        setEmail(e.target.value);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        props.onRegister(email, password);
    }

    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" type="email"
                       name="email" placeholder="Email" value={email} onChange={handleEmailInput} required/>
                <input className="login__input" type="password" name="password" placeholder="Пароль" value={password}
                       onChange={handlePasswordInput} required/>
                <button className="login__button" type="submit">Зарегистрироваться
                </button>
            </form>
            <p className="login__text">Уже зарегистрированы?
                <Link className={"login__link"} to="/sign-in">Войти</Link>
            </p>
        </section>
    )
}

export default Register;
