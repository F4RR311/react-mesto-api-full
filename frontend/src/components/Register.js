import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister({
      email: formParams.email,
      password: formParams.password,
    });
  }
  return (
    <div className="acess">
      <form className="acess__form" onSubmit={handleSubmit}>
        <h2 className="acess__title">Регистрация</h2>
        <input
          className="acess__input"
          placeholder="Email"
          name="email"
          type="email"
          value={formParams.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          className="acess__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={formParams.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button className="acess__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <p className="acess__caption">
          Уже зарегистрированы?
          <Link to="/signin" className="acess__caption-link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
