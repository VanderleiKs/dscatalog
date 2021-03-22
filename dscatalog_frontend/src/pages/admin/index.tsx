import PrivateRoute from 'core/components/Routes/PrivateRoute';
import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import Categories from './components/Categories';
import { Navbar } from './components/Navbar/Navbar';
import Products from './components/Product';
import './styles.scss';

const Admin = () => {
    let { url } = useRouteMatch();
    return (

        <div className="container-admin-general">
            <Navbar />
            <div className="container-admin-content">
                <Switch>
                    <PrivateRoute path={`${url}/products`} alowedRoles={['ROLE_OPERATOR', 'ROLE_ADMIN']}>
                        <Products />
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/categories`} alowedRoles={['ROLE_OPERATOR', 'ROLE_ADMIN']}>
                        <Categories />
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