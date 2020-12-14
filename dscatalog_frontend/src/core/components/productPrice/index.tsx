import React from 'react';
import './styles.scss';

type Props = {
    price : string;
}

const ProductPrice = ({price} : Props) => (
    <div className="container-product-price">
        <span className="currency-price">R$</span>
        <p className="product-price">{price}</p>
    </div>
);

export default ProductPrice;