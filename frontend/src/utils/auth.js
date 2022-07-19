function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export const BASE_URL = "https://api.mymesto.nomoredomains.xyz";

export function registerUser(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),

    }).then(checkResponse);
}

export function loginUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),

    }).then(checkResponse);
}

export function getToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
              headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
    }).then((res) => {
        if (res.status === 400) {
            throw new Error("Токен не передан или передан не в том формате");
        } else if (res.status === 401) {
            throw new Error("Переданный токен некорректен");
        } else return res.json();
    });
}

export function logout(email) {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
    })
}