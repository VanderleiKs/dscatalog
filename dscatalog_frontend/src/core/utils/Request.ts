import Axios, { Method } from "axios";
import qs from "qs";
import { CLIENT_ID, CLIENT_SECRET, getSessionData, isAuthenticated, logout } from "./Auth";
import history from './history';

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}

const baseUrl = 'http://localhost:8080';

Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
    return Axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        params,
        headers
    });
}

export const makePrivateRequest = ({ method = 'GET', url, data, params }: RequestParams) => {
    if (isAuthenticated()) {
        const sessionData = getSessionData();
        const headers = {
            'Authorization': `Bearer ${sessionData?.access_token}`
        }
        return makeRequest({ method, url, data, params, headers });
    }
    history.push("/auth/login");
}


export const makeLogin = (loginData: LoginData) => {
    const token = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const headers = {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({ ...loginData, grant_type: 'password' });

    return makeRequest({
        method: "POST",
        url: "/oauth/token",
        headers: headers,
        data: payload
    })
}

