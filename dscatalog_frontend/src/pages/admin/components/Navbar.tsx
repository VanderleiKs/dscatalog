import React from 'react';
import './styles.scss';

export const Navbar = () => (

    <nav className="container-admin-navbar">
        <ul>
            <li>
                <a className="admin-navbar-item active" href="lin">Meus Produtos</a>
            </li>
            <li>
                <a className="admin-navbar-item" href="lin">Minhas Categorias</a>
            </li>
            <li>
                <a className="admin-navbar-item" href="lin">Meus Usuários</a>
            </li>
        </ul>
    </nav>

);

