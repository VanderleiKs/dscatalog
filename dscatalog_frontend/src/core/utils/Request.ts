import Axios, { Method } from "axios";
import qs from "qs";
import { CLIENT_ID, CLIENT_SECRET } from "./Auth";

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

export const makeRequest = ({method = 'GET', url, data, params, headers}: RequestParams) => {
    return Axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        params,
        headers
    });
}

export const makeLogin = (loginData: LoginData) => {
    const token = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    
    const headers = {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({...loginData, grant_type: 'password'});

    return makeRequest({
        method: "POST",
        url: "/oauth/token",
        headers: headers,
        data: payload
    })
}

