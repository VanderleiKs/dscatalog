import React from 'react';
import { ReactComponent as Seta } from '../../assets/images/seta.svg';
import './styles.scss';
import { Link } from 'react-router-dom';

type Props = {
    name: string;
}

const ButtonIcon = ({ name }: Props) => (

    <div className="row d-flex">
        <Link to="/catalog">
            <button className="btn btn-primary button-icon">{name}
            </button>
        </Link>
        <div className="seta-icon">
            <Seta />
        </div>
    </div>

);

export default ButtonIcon;