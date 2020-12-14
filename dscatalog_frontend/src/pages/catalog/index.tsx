import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/Request';
import ProductCard from './components/productCard';
import './styles.scss';

const Catalog = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();

    useEffect(()=> {
        const params = {
            page: 0,
            sizePage: 12
        }

        makeRequest({url: '/products', params: params})
        .then(response => setProductResponse(response.data));
    }, [])

    return (

        <div className="container-base">
            <h4 className="title">Catálogo de produtos</h4>
            <div className="container-catalog">
    
                {productResponse?.content.map(product => (
                    <Link to={`products/${product.id}`}>
                        <ProductCard product={product} key={product.id}/>
                    </Link>
                ))}
                                
            </div>
    
        </div>
    );
}

export default Catalog;