import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/Request';
import { ProductLoader } from './components/Loaders/ProductLoader';
import ProductCard from './components/productCard';
import './styles.scss';
import Pagination from 'core/components/Pagination';

const Catalog = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            sizePage: 10,
            direction: 'DESC',
            orderBy: 'id'
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage])

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
            {productResponse && <Pagination 
            totalPages={productResponse.totalPages}
            activePage={activePage} 
            onChange={page => setActivePage(page)}
            />}
        </div>
    );
}

export default Catalog;