import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/Request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from './Card';
import './styles.scss';

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            sizePage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        makeRequest({ url: "/products", params: params })
            .then(response => setProductResponse(response.data));
    }, [activePage]);

    useEffect(() => { getProducts() }, [getProducts]);

    const onRemove = (productID: number) => {
        if (window.confirm('Deseja realmente excluir?')) {
            makePrivateRequest({ method: "DELETE", url: `/products/${productID}` })
                ?.then(() => {
                    toast.success('Produto excluido com sucesso!');
                    if (productResponse && (productResponse.totalElements - 1 > 0)
                        && ((productResponse.totalElements - 1) % productResponse.size === 0)) {
                        setActivePage(activePage - 1);
                    }
                    else {
                        getProducts();
                    }
                }).catch(() => {
                    toast.error('Erro ao excluir produto');
                });
        }
    }

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-container-cards">
                {productResponse?.content.map(product => (
                    <Card key={product.id} product={product} onRemove={onRemove} />
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