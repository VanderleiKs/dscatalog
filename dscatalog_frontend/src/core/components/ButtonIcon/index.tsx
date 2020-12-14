import React from 'react';
import { ReactComponent as Seta } from '../../assets/images/seta.svg';
import './styles.scss';

type Props = {
    name: string;
}

const ButtonIcon = ({ name }: Props) => (

    <div className="row d-flex">
            <button className="btn btn-primary button-icon">{name}
            </button>
        <div className="seta-icon">
            <Seta />
        </div>
    </div>

);

export default ButtonIcon;