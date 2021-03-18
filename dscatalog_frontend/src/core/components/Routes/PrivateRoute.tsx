import { isAlowedByRole, isAuthenticated, Role } from 'core/utils/Auth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    path: string;
    alowedRoles?: Role[];
}

const PrivateRoute = ({ children, path, alowedRoles }: Props) => {
    return (
        <Route
            path={path}
            render={({ location }) => {
                if (!isAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/admin/auth/login",
                                state: { from: location }
                            }}
                        />
                    )
                } else if (isAuthenticated() && !isAlowedByRole(alowedRoles)) {
                    return <Redirect to={{ pathname: "/admin" }} />
                }
                return children;
            }}
        />
    );
}

export default PrivateRoute;