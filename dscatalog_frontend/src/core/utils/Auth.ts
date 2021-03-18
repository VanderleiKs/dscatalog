import jwtDecode from "jwt-decode";

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

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (dataLogin: DataLogin) => {
    localStorage.setItem('AuthData', JSON.stringify(dataLogin));
}

export const getSessionData = () => {
    const token = localStorage.getItem('AuthData');
    if (token != null) {
        return JSON.parse(token) as DataLogin;
    }
    return null;
}

export const getAccessTokenDecoded = () => {
    const sessionData = getSessionData();
    if (sessionData != null) {
        var decoded = jwtDecode(sessionData?.access_token) as AccessToken;
        return decoded;
    }
    return null;
}

const checkTokenIsValid = () => {
    if (getAccessTokenDecoded() != null) {
        const { exp } = getAccessTokenDecoded()!;
        return Date.now() <= exp * 1000;
    }
    return false;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();
    return sessionData?.access_token && checkTokenIsValid();
}

export const isAlowedByRole = (roles: Role[] = []) => {
    const userRoles = getAccessTokenDecoded();

    return roles.some(role => userRoles?.authorities.includes(role));
}