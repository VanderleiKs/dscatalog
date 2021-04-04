import Pagination from 'core/components/Pagination';
import SearchProducts from 'core/components/SearchProducts';
import { ProductResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/Request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '../../Categories/ListCategories';
import CardLoader from '../Loaders/CardLoader';
import Card from './Card';
import './styles.scss';

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [activePage, setActivePage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            sizePage: 4,
            direction: 'DESC',
            orderBy: 'id',
            name: name,
            categoryId: category?.id
        }
        setIsLoading(true);
        makeRequest({ url: "/products", params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage, name, category]);

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

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const handleChangeCategory = (category: Category) => {
        setActivePage(0);
        setCategory(category);
    }

    const cleanFilterSearch = () => {
        setActivePage(0);
        setName('');
        setCategory(undefined);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleCreate}>ADICIONAR</button>
                <SearchProducts 
                    name={name}
                    category={category}
                    handleChangeName={handleChangeName}
                    handleChangeCategory={handleChangeCategory}
                    cleanFilterSearch={cleanFilterSearch} 
                />
            </div>
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