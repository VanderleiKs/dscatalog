import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../core/utils/Request';
import ProductCard from './components/productCard';
import './styles.scss';

const Catalog = () => {

    useEffect(()=> {
        const params = {
            page: 0,
            sizePage: 3
        }

        makeRequest({url: '/products', params: params})
        .then(response => console.log(response.data));
    }, [])

    return (

        <div className="container-base">
            <h4 className="title">Catálogo de produtos</h4>
            <div className="container-catalog">
    
                <Link to="/products/1"><ProductCard name=""/></Link>
                <Link to="/products/2"><ProductCard/></Link>
                <Link to="/products/3"><ProductCard/></Link>
                <Link to="/products/4"><ProductCard/></Link>
                <Link to="/products/5"><ProductCard/></Link>
                <Link to="/products/6"><ProductCard/></Link>
                <Link to="/products/7"><ProductCard/></Link>
                <Link to="/products/8"><ProductCard/></Link>
                
            </div>
    
        </div>
    );
}

export default Catalog;