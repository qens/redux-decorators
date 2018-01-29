import {apiClient} from "./api-client";
import {Url} from "./url";


export const BASE_URL = 'http://localhost:8001';

export const login = (username, password) => apiClient.post(new Url(`${BASE_URL}/api/login`), {username, password});