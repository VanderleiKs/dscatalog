import React from 'react';
import './styles.scss';

type Props = {
    price : number;
}

const formatPrice = (priceFormat: number) => {
    return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(priceFormat);
}

const ProductPrice = ({price} : Props) => (
    <div className="container-product-price">
        <span className="currency-price">R$</span>
        <p className="product-price">{formatPrice(price)}</p>
    </div>
);

export default ProductPrice;