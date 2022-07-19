function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export const BASE_URL = "https://api.mymesto.nomoredomains.xyz";

export function registerUser(email, password ) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),

    }).then(checkResponse);
}

export function loginUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),

    }).then(checkResponse);
}

export function getToken() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        //    'Authorization': `Bearer ${jwt}`,
        },
    }).then(checkResponse);
}