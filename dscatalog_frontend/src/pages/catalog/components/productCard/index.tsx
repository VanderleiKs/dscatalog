import React from 'react';
import './styles.scss';
import {ReactComponent as ProductImage} from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/productPrice';

type Props = {
    name? : string;
}

const ProductCard = ({name}: Props) => (

    <div className="catalog-products card-base">
        <ProductImage/>
        <div className="product-name">
<span>{name}Computador Desktop - Intel Core i7</span>
        </div>
        <ProductPrice price="2.799,00"/>
    </div>
);

export default ProductCard;