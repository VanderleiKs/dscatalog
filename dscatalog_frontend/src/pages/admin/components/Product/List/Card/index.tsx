import ProductPrice from 'core/components/productPrice';
import { Product } from 'core/types/Product';
import { makePrivateRequest } from 'core/utils/Request';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDel } from '..';
import './styles.scss';

type Props = {
    id: number;
    product: Product;
}

const Card = ({ product, id }: Props) => {

    const handleDel = () => {
        makePrivateRequest({ method: "DELETE", url: `/products/${id}` })
            ?.then(() => {
                updateDel();
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
                    {product.categories.map((category) => (
                        <span key={category.id} className="badge rounded-pill bg-light text-dark mr-3 mt-2">{category.name}</span>
                    ))}

                </div>
            </div>
            <div className="container-buttons col-3">
                <Link to={`/admin/products/${product.id}`}
                className="btn btn-outline-secondary admin-card-button btn-block">
                    editar
                </Link>
                <button className="btn btn-outline-danger admin-card-button btn-block"
                    onClick={handleDel}>
                    excluir
            </button>
            </div>
        </div>

    );
}
export default Card;
