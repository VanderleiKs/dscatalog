import React from 'react';
import './style.scss';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => (
    <nav className="row bg-primary nav-header">
        <div className="col-2 header-ds">
            <Link to="/" ><h4>Ds Catalog</h4></Link>
        </div>
        <div className="col-6 offset-2">
            <ul className="header-menu">
                <li>
                    <NavLink activeClassName="active" to="/" exact>HOME</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog" activeClassName="active">CATÁLOGO</NavLink>
                </li>
                <li>
                    <NavLink to="/admin" activeClassName="active">ADMIN</NavLink>
                </li>
            </ul>
        </div>

    </nav>

);

export default Navbar;


