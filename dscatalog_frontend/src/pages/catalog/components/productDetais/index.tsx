import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product_detais_image.svg';
import { ReactComponent as SetaImage} from '../../../../core/assets/images/seta.svg';
import ProductPrice from '../../../../core/components/productPrice';

/*type Params = {
    productId: string;
}*/

const ProductDetais = () => {
    //const { productId } = useParams<Params>();

    return (
        <div className="card-base product-detais-card">
            <Link to="/products" className="container-link-golback d-flex">
                <SetaImage className="seta-golback"/>
            <h1 className="text-golback">voltar</h1>
            </Link>
            <div className="product-detais-container">
                <div className="col-6 container-image pr-5">
                    <div className="product-image-card"><ProductImage className="product-image" /></div>
                    <h3 className="product-detais-name">Computador Desktop - Intel Core i7</h3>
                    <ProductPrice price="2.800,00"/>
                </div>
                <div className="col-6 container-detais-text">
                    <div className="product-descrition-card">
                        <h4 className="product-detais-text-title">Decrição do Produto</h4>
                        <p className="product-detais-text">
                            Seja um mestre em multitarefas com a capacidade para exibir quatro aplicativos 
                            simultâneos na tela. A tela está ficando abarrotada? Crie áreas de trabalho virtuais 
                            para obter mais espaço e trabalhar com os itens que você deseja. Além disso, todas as 
                            notificações e principais configurações são reunidas em uma única tela de fácil acesso.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetais;