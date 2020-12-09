import React from 'react';
import './style.scss';


const Navbar = () => (
    <nav className="row bg-primary nav-header">
        <div className="col-2 header-ds">
            <a href="lin" ><h4>Ds Catalog</h4></a>
        </div>
        <div className="col-6 offset-2">
            <ul className="header-menu">
                <li>
                    <a className="active" href="link">HOME</a>
                </li>
                <li>
                    <a href="link">CATÁLOGO</a>
                </li>
                <li>
                    <a href="link">ADMIN</a>
                </li>
            </ul>
        </div>

    </nav>

);

export default Navbar;


