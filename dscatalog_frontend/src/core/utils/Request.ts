import Axios, { Method } from "axios";

type RequestParams = {
    method?: Method;
    url: string;
    data?: object;
    params?: object;
}

const baseUrl = 'http://localhost:3000';

export const makeRequest = ({method = 'GET', url, data, params}: RequestParams) => {
    return Axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        params
    });
}