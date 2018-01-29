import isString from 'lodash/isString';

class ApiClient {

    async get(url, body, options) {
        return this.request(url, body, options, 'GET');
    }

    async post(url, body, options) {
        return this.request(url, body, options, 'POST');
    }

    async put(url, body, options) {
        return this.request(url, body, options, 'PUT');
    }

    async delete(url, body, options) {
        return this.request(url, body, options, 'DELETE');
    }

    async request(url, body, options, method) {

        if (body) {
            body = (body instanceof FormData || isString(body)) ? body : JSON.stringify(body);
        }

        return fetch(url.toString(), Object.assign({
            body,
            method
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            ...options
        })).then(response => {
            return response.json();
        })
    }
}

export const apiClient = new ApiClient();