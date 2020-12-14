import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as SetaImage } from '../../../../core/assets/images/seta.svg';
import ProductPrice from '../../../../core/components/productPrice';
import { Product } from '../../../../core/types/Product';
import { makeRequest } from '../../../../core/utils/Request';
import './styles.scss';

type ParamsType = {
    productId: string;
}


const ProductDetais = () => {
    const { productId } = useParams<ParamsType>();
    const [productResponse, setProductResponse] = useState<Product>();

    useEffect(() => {
        makeRequest({ url: `/products/${productId}` })
            .then(response => setProductResponse(response.data));
    }, [productId]);

    return (
        <div className="card-base product-detais-card">
            <Link to="/products" className="container-link-golback d-flex">
                <SetaImage className="seta-golback" />
                <h1 className="text-golback">voltar</h1>
            </Link>
            <div className="product-detais-container">
                <div className="col-6 container-image pr-5">
                    <div className="product-image-card">
                        <img className="product-details-image" src={productResponse?.imgUrl} alt={productResponse?.name} />
                    </div>
                    <h3 className="product-detais-name">{productResponse?.name}</h3>
                    {productResponse?.price && <ProductPrice price={productResponse?.price} />}
                </div>
                <div className="col-6 container-detais-text">
                    <div className="product-descrition-card">
                        <h4 className="product-detais-text-title">Decrição do Produto</h4>
                        <p className="product-detais-text">
                            {productResponse?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetais;