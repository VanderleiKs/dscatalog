import { getAccessTokenDecoded, isAuthenticated, logout } from 'core/utils/Auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './style.scss';

const Navbar = () => {
    const [userSession, setUserSession] = useState('');
    const [userAuthorities, setUserAuthorities] = useState('');
    const location = useLocation();

    useEffect(() => {
        setUserSession(isAuthenticated() ? getAccessTokenDecoded().user_name : '');
        if (isAuthenticated()) {
            getAccessTokenDecoded().authorities?.some(role =>
                role === 'ROLE_ADMIN') ? setUserAuthorities('ADMIN') : setUserAuthorities('OPERATOR');
        }
        else {
            setUserAuthorities('');
        }
    }, [location]);

    const onLogout = () => {
        logout();
    }

    return (
        <nav className="row bg-primary nav-header">
            <div className="col-3 header-ds">
                <Link to="/" ><h4>Ds Catalog</h4></Link>
            </div>
            <div className="col-6">
                <ul className="header-menu">
                    <li>
                        <NavLink className="nav-link" activeClassName="active" to="/" exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/products" activeClassName="active">CATÁLOGO</NavLink>
                    </li>

                    <li>
                        {userSession && (
                            <NavLink className="nav-link" to="/admin" activeClassName="active">ADMIN</NavLink>
                        )}
                    </li>

                </ul>

            </div>
            <div className="col-3 nav-admin">
                {userSession && (
                    <>
                        {`${userAuthorities} | ${userSession}`}&emsp;
                        <button onClick={onLogout} className="link-logout">LOGOUT</button>
                    </>
                )}
                {!userSession && (
                    <Link to="/auth/login" className="nav-link active">Login</Link>
                )}
            </div>

        </nav>

    )
};

export default Navbar;


