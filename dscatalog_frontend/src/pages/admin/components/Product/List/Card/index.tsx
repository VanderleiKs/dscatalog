import ProductPrice from 'core/components/productPrice';
import { Product } from 'core/types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    product: Product;
    onRemove: (productId: number) => void;
}

const Card = ({ product, onRemove }: Props) => {


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
                    onClick={() => onRemove(product.id)}>
                    excluir
            </button>
            </div>
        </div>

    );
}
export default Card;
