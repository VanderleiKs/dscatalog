import React from 'react';
import './styles.scss';
import ProductPrice from '../../../../core/components/productPrice';
import { Product } from '../../../../core/types/Product';

type Props = {
    product: Product;
}

const ProductCard = ({ product }: Props) => (

    <div className="catalog-products card-base">
        <img className="product-image" src={product.imgUrl} alt={product.name}/>
        <div className="product-name">
            <span>{product.name}</span>
        </div>
        <ProductPrice price={product.price}/>
    </div>
);

export default ProductCard;