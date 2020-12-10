import React from 'react';
import {ReactComponent as MainImage} from '../../core/assets/images/main-image.svg';
import ButtonIcon from '../../core/components/ButtonIcon';
import './styles.scss';

const Home = () => (

    <div className="row container-main card-base">
        <div className="col-6 container-text">
            <h1>Conheça o melhor <br/> catálogo de produtos</h1>
            <p>Ajudaremos você a encontrar os melhores <br/> produtos disponíveis no mercado.</p>
            <ButtonIcon name="INICIE AGORA A SUA BUSCA"/>
        </div>
        <div className="col-6">
            <MainImage className="main-image"/>
        </div>

    </div>
);

export default Home;