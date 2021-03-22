import ProductPrice from 'core/components/productPrice';
import { Categories, Product } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/Request';
import { catResponse } from 'pages/admin/components/Categories';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './styles.scss';

type Props = {
    product: Product;
    id: number;
}

export var handleDel;

const Card = ({product, id}: Props) => {
    const [cat, setCat] = useState<catResponse>();

    useEffect(() => {
        makePrivateRequest({url:"/categories"})
        ?.then(response => setCat(response.data));
    }, []);


   handleDel = () => {
        makePrivateRequest({method: "DELETE", url: `/products/${id}`})
        ?.then(() => {
            toast.success("Produto excluido com sucesso!");
        });
    }

    return (
    <div className="card-base container-card">
        <div className="card-image col-2">
            <img className="image-product" src={product.imgUrl} alt={product.name} />
        </div>
        <div className="container-card-text col-7">
            <h4 className="name-product">{product.name}</h4>
            <ProductPrice price={product.price} />
            <div>
                {cat?.content.map((category) => (
                    <span key={category.id} className="badge rounded-pill bg-light text-dark mr-3 mt-2">{category.name}</span>
                ))}
            
            </div>
        </div>
        <div className="container-buttons col-3">
            <button className="btn btn-outline-secondary admin-card-button btn-block">editar</button>
            <button className="btn btn-outline-danger admin-card-button btn-block" onClick={handleDel}>excluir</button>
        </div>
    </div>

);
    }
export default Card;
