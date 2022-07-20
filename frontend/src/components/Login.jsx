import React, {useState} from "react";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(e){
        setEmail(e.target.value);
    }

    function handlePasswordInput(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onLogin(email,password);
    }
    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" placeholder="Email" value={email} onChange={handleEmailInput} required/>
                <input className="login__input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required />
                <button className="login__button" type="submit">Войти
                </button>
            </form>

        </section>


    )


}

export default Login;
