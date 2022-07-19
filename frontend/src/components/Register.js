import React, {useState} from "react";
import {Link} from "react-router-dom";

const Register = (props) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    //
    // function handleEmailInput(e) {
    //     setEmail(e.target.value);
    // }
    //
    // function handlePasswordInput(e) {
    //     setPassword(e.target.value);
    // }
    const [data, setData] = useState({
        password: '',
        email: '',
    });
    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('data', data)
        const { password, email } = data;
        props.onRegister({ password, email });
    }

    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" placeholder="Email" value={data.email} onChange={handleChange} required/>
                <input className="login__input" type="password" placeholder="Пароль" value={data.password}
                       onChange={handleChange} required/>
                <button className="login__button" type="submit">Зарегистрироваться
                </button>
            </form>
            <p className="login__text"> Уже зарегистрированы? <Link className={"login__link"} to="/sign-in"> Войти</Link> </p>
        </section>
    )
}

export default Register;
