import React from 'react';
import ProductCard from './components/productCard';
import './styles.scss';

const Catalog = () => (

    <div className="container-base">
        <h4 className="title">Catálogo de produtos</h4>
        <div className="container-catalog">

            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            
        </div>

    </div>
);

export default Catalog;