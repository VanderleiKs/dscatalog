import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/Request';
import { ProductLoader } from './components/Loaders/ProductLoader';
import ProductCard from './components/productCard';
import './styles.scss';

const Catalog = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = {
            page: 0,
            sizePage: 12
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    return (
        <div className="container-base">
            <h4 className="title">Catálogo de produtos</h4>
            <div className="container-catalog">
                {isLoading ? <ProductLoader/> : (
                    productResponse?.content.map(product => (
                        <Link to={`products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    )))
                }
            </div>
        </div>
    );
}

export default Catalog;