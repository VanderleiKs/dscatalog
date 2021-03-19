import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Navbar from './core/components/navbar';
import history from './core/utils/history';
import Admin from './pages/admin';
import Auth from './pages/auth';
import Catalog from './pages/catalog';
import ProductDetais from './pages/catalog/components/productDetais';
import Home from './pages/home';

const Routes = () => (
    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog />
            </Route>
            <Route path="/products/:productId">
                <ProductDetais />
            </Route>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/products" exact />
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>

);

export default Routes;