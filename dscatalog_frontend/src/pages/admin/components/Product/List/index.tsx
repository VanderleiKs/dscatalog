import { useCallback, useEffect, useState } from 'react';
import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/Request';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from './Card';
import './styles.scss';
import CardLoader from '../Loaders/CardLoader';

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [activePage, setActivePage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            sizePage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: "/products", params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage]);

    useEffect(() => { getProducts() }, [getProducts]);

    const onRemove = (productID: number) => {
        makePrivateRequest({ method: "DELETE", url: `/products/${productID}` })
            ?.then(() => {
                toast.success('Produto excluido com sucesso!');
                if (productResponse && (productResponse.totalElements - 1 > 0)
                    && ((productResponse.totalElements - 1) % productResponse.size === 0)) {
                    activePage > 0 ? setActivePage(activePage - 1) : getProducts();
                }
                else {
                    getProducts();
                }
            }).catch(() => {
                toast.error('Erro ao excluir produto');
            });
    }

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-container-cards">
                {isLoading ? <CardLoader /> : (
                    productResponse?.content.map(product => (
                        <Card key={product.id} product={product} onRemove={onRemove} />
                    ))
                )}
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