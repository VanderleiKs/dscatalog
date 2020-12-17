import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export const Navbar = () => (

    <nav className="container-admin-navbar">
        <ul>
            <li>
                <NavLink className="admin-navbar-item" to="/admin/products">
                    Meus Produtos
                </NavLink>
            </li>
            <li>
                <NavLink className="admin-navbar-item" to="/admin/categories">
                    Minhas Categorias
                </NavLink>
            </li>
            <li>
                <NavLink className="admin-navbar-item" to="/admin/users">
                    Meus Usuários
                </NavLink>
            </li>
        </ul>
    </nav>

);

