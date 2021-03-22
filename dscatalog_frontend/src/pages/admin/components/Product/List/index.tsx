import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/Request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card, { handleDel } from './Card';
import './styles.scss';

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [activePage, setActivePage] = useState(0);


    const history = useHistory();
    const handleCreate = () => {
        history.push('/admin/products/create');
    }
    useEffect(() => {

        const params = {
            page: activePage,
            sizePage: 4
        }

        makePrivateRequest({url:"/products", params: params})
        ?.then(response => setProductResponse(response.data));
    }, [activePage, handleDel])


    return(
        <div>
            <button className="btn btn-primary" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-container-cards">
                {productResponse?.content.map(product => (
                    <Card key={product.id} product={product} id={product.id}/>
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