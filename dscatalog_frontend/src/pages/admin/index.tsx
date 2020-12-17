import React from 'react';
import './styles.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Products from './components/Product';

const Admin = () => {
    let { url } = useRouteMatch();
    return (

        <div className="container-admin-general">
            <Navbar />
            <div className="container-admin-content">
                <Switch>
                    <Route path={`${url}/products`}>
                        <Products />
                    </Route>
                    <Route path={`${url}/categories`}>
                        <h1>categories</h1>
                    </Route>
                    <Route path={`${url}/users`}>
                        <h1>Users</h1>
                    </Route>
                </Switch>
            </div>
        </div>

    );
}

export default Admin;