import transform from 'lodash/transform';

export class Url {

    constructor(url = BASE_URL, params = {}) {
        this.url = url;
        this.params = params;
    }

    addParam({key, value}) {
        this.params[key] = value;
    }

    toString() {
        let paramsStr = '?';

        paramsStr += transform(this.params, (result, value, key) => {
            result.push(`${key}=${value}`);
        }, []).join('&');

        return this.url + paramsStr;
    }
}