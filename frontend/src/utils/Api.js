class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`)
        }
    }

    getProfile(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
            Authorization: `Bearer ${token}`,

        })
            .then(this._checkResponse)


    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers,
            Authorization: `Bearer ${token}`,

        })
            .then(this._checkResponse)

    }

    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job

            })

        })
            .then(this._checkResponse)

    }


    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    removeCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse)

    }

    changeStatusLike(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: `${!isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._checkResponse)

    }

    addAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar_profile
            })

        })
            .then(this._checkResponse)

    }


}

export const api = new Api({
    baseUrl: 'https://api.mymesto.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json'
    }
});