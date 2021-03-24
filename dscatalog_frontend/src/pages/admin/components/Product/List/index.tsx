import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/Request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import './styles.scss';

export var updateDel: { (): void; (): void; };

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [activePage, setActivePage] = useState(0);
    const [delProduct, setDelProduct] = useState(false);
    const history = useHistory();

    updateDel = () => {
        setDelProduct(true);
        if (productResponse && (productResponse.totalElements - 1 > 0)
            && ((productResponse.totalElements - 1) % productResponse.size === 0)) {
            setActivePage(activePage - 1);
        }
    }

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    useEffect(() => {
        const params = {
            page: activePage,
            sizePage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        makeRequest({ url: "/products", params: params })
            .then(response => setProductResponse(response.data));
        setDelProduct(false);

    }, [activePage, delProduct]);

    return (
        <div>
            <button className="btn btn-primary" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-container-cards">
                {productResponse?.content.map(product => (
                    <Card key={product.id} product={product} id={product.id} />
                ))}
            </div>
            {productResponse &&
                <Pagination
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                    totalPages={productResponse?.totalPages}
                />
            }
        </div>

    );
}
export default List;