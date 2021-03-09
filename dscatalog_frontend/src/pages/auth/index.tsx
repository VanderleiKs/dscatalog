import React from 'react';
import './styles.scss';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthCard from './components/Card';
import Login from './components/Login';
import Register from './components/Register';
import Recover from './components/Recover';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-container-info">
            <h1 className="info-title">Divulgue seus produtos <br /> no DS Catalog</h1>
            <p className="info-subtitle">Faça parte do nosso catálogo de divulgação e <br /> aumente a venda dos seus produtos.</p>
            <AuthImage className="image" />
        </div>
        <div className="auth-container-formulario">
            <div className="formulario-content">
                
                <Switch>
                    <Redirect from="/admin/auth" to="/admin/auth/login" exact /> 
                    <Route path="/admin/auth/login">
                    <Login />
                    </Route>
                    <Route path="/admin/auth/register">
                    <Register />
                    </Route>
                    <Route path="/admin/auth/recover">
                    <Recover />
                    </Route>            
                </Switch>
            </div>
        </div>
    </div>

);

export default Auth;