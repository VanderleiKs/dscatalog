import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Recover from './components/Recover';
import Register from './components/Register';
import './styles.scss';

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
                    <Redirect from="/auth" to="/auth/login" exact /> 
                    <Route path="/auth/login">
                    <Login />
                    </Route>
                    <Route path="/auth/register">
                    <Register />
                    </Route>
                    <Route path="/auth/recover">
                    <Recover />
                    </Route>            
                </Switch>
            </div>
        </div>
    </div>

);

export default Auth;