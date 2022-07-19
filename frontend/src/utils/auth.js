import { BASE_URL } from "./constants";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',     
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then((res) => {
    if (res.status === 400)
      throw new Error("Пользователь с таким email уже зарегистрирован");
    return res.json();
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("Не передано одно из полей");
    } else if (res.status === 401) {
      throw new Error("Некорректный email или пароль");
    } else return res.json();
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Что-то пошло не так!");
    };
  });
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
    },
    credentials: 'include',
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("Токен не передан или передан не в том формате");
    } else if (res.status === 401) {
      throw new Error("Переданный токен некорректен");
    } else return res.json();
  });
};
