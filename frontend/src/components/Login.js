import React, { useState } from "react";

function Login(props) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin({
      email: formParams.email,
      password: formParams.password,
    });
  }
  return (
    <div className="acess">
      <form className="acess__form" onSubmit={handleSubmit}>
        <h2 className="acess__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
