import React from 'react';
import './styles.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Switch, useRouteMatch } from 'react-router-dom';
import Products from './components/Product';
import PrivateRoute from 'core/components/Routes/PrivateRoute';

const Admin = () => {
    let { url } = useRouteMatch();
    return (

        <div className="container-admin-general">
            <Navbar />
            <div className="container-admin-content">
                <Switch>
                    <PrivateRoute path={`${url}/products`} alowedRoles={['ROLE_OPERATOR']}>
                        <Products />
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/categories`} alowedRoles={['ROLE_OPERATOR']}>
                        <h1>categories</h1>
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/users`} alowedRoles={['ROLE_ADMIN']}>
                        <h1>Users</h1>
                    </PrivateRoute>
                </Switch>
            </div>
        </div>

    );
}

export default Admin;