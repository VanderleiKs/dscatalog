import jwtDecode from "jwt-decode";
import history from './history';

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

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (dataLogin: DataLogin) => {
    localStorage.setItem('AuthData', JSON.stringify(dataLogin));
}

export const logout = () => {
   localStorage.removeItem('AuthData');
   history.replace("/auth/login");
}

export const getSessionData = () => {
    return JSON.parse(localStorage.getItem('AuthData') || '{}') as DataLogin;
}

export const getAccessTokenDecoded = () => {
    try {
        const sessionData = getSessionData();
        return jwtDecode(sessionData?.access_token) as AccessToken;
    } catch (error) {
        return {} as AccessToken;
    }
}

const checkTokenIsValid = () => {
        const { exp } = getAccessTokenDecoded();
        return Date.now() <= exp * 1000;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();
    return sessionData?.access_token && checkTokenIsValid();
}

export const isAlowedByRole = (roles: Role[] = []) => {
    const userRoles = getAccessTokenDecoded();
    return roles.some(role => userRoles.authorities?.includes(role));
}