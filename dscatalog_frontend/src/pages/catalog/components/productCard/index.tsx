import React from 'react';
import './styles.scss';
import {ReactComponent as ProductImage} from '../../../../core/assets/images/product.svg';

const ProductCard = () => (

    <div className="catalog-products card-base">
        <ProductImage/>
        <div className="product-name">
            <span>Computador Desktop - Intel Core i7</span>
        </div>
        <div className="container-product-price">
            <span className="currency-price">R$</span>
            <p className="product-price">2.779,00</p>
        </div>
    </div>
);

export default ProductCard;