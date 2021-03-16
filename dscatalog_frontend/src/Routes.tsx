import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './core/components/navbar';
import Admin from './pages/admin';
import Catalog from './pages/catalog';
import ProductDetais from './pages/catalog/components/productDetais';
import Home from './pages/home';
import Auth from './pages/auth';
import history from './core/utils/history';

const Routes = () => (
<Router history={history}>
<Navbar/>
<Switch>
    <Route path="/" exact>
        <Home/>
    </Route>
    <Route path="/products" exact>
        <Catalog/>
    </Route>
    <Route path="/products/:productId">
        <ProductDetais/>
    </Route>
    <Route path="/admin/auth">
        <Auth />
    </Route>
    <Redirect from="/admin" to="/admin/products" exact />
    <Route path="/admin">
        <Admin/>
    </Route>
</Switch>
</Router>

);

export default Routes;