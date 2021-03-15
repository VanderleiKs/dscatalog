import { stringify } from "qs";

export const CLIENT_ID = "dscatalog";
export const CLIENT_SECRET = "dscatalog123";

type DataLogin = {
access_token: string;
expires_in: number;
firstName: string;
id: number;
scope: string;
token_type: string;
}

export const saveSessionData = (dataLogin: DataLogin) => {
    localStorage.setItem('AuthData', JSON.stringify(dataLogin));
}

export const findSessionData = () => {
   return localStorage.getItem('AuthData');
}