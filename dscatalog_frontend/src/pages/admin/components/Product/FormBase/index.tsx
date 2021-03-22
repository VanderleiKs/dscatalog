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
        history.goBack();
    }   
    return(

    <div className="card-base container-formbase">
        <h3 className="formbase-title">{title}</h3>
        {children}
        <div className="container-formBase-actions">
            <button className="btn btn-outline-danger mr-3 formbase-buttton" onClick={handleCancel}>CANCELAR</button>
            <button className="btn btn-primary formbase-buttton">CADASTRAR</button>
        </div>
    </div>

);
}
export default FormBase;
