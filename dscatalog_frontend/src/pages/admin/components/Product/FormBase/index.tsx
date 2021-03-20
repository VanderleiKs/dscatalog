import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const FormBase = ({title, children}: Props) => {
    const history = useHistory();

    const handleCancel = () => {
        history.push('../');
    }   
    return(

    <div className="card-base container-formbase">
        <h3 className="title-card">{title}</h3>
        {children}
        <div className="container-formBase-actions">
            <button className="btn btn-outline-danger mr-3" onClick={handleCancel}>CANCELAR</button>
            <button className="btn btn-primary">CADASTRAR</button>
        </div>
    </div>

);
}
export default FormBase;
