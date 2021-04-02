import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/Request';
import { ProductLoader } from './components/Loaders/ProductLoader';
import ProductCard from './components/productCard';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import Search, {SearchForm} from 'core/components/Search';

const Catalog = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);


    const getProducts = useCallback((searchForm?: SearchForm) => {
        const params = {
            page: activePage,
            sizePage: 10,
            direction: 'DESC',
            orderBy: 'id',
            name: searchForm?.name,
            categoryId: searchForm?.categoryId
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage])

    useEffect(() => {
       getProducts();
    }, [getProducts])

    return (
        <div className="container-base">
            <div className="d-flex justify-content-between barra-superior">
                <h4 className="title">Catálogo de produtos</h4>
                <Search onSearch={searchForm => getProducts(searchForm) }/>
            </div>
            <div className="container-catalog">
                {isLoading ? <ProductLoader /> : (
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