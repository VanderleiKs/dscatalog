import ProductPrice from 'core/components/productPrice';
import { Product } from 'core/types/Product';
import ProductCard from 'pages/catalog/components/productCard';
import React from 'react';
import './styles.scss';

type Props = {
    product: Product;
}

const Card = ({product}: Props) => (

    <div className="card-base container-card">
        <div className="card-image col-2">
            <img className="image-product" src={product.imgUrl} alt={product.name} />
        </div>
        <div className="container-card-text col-7">
            <h4 className="name-product">{product.name}</h4>
            <ProductPrice price={product.price} />
            <div className="product-description">
                {product.description}
            </div>
        </div>
        <div className="container-buttons col-3">
            <button className="btn btn-outline-secondary button">editar</button>
            <button className="btn btn-outline-danger button">excluir</button>
        </div>
    </div>

);

export default Card;
