import React from 'react';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
    nameButtonCad: string;
    handleCancel: () => void;
}

const FormBase = ({title, children, nameButtonCad, handleCancel}: Props) => (
    <div className="card-base container-formbase">
        <h3 className="formbase-title">{title}</h3>
        {children}
        <div className="container-formBase-actions">
            <button className="btn btn-outline-danger mr-3 formbase-buttton" onClick={handleCancel}>CANCELAR</button>
            <button className="btn btn-primary formbase-buttton">{nameButtonCad}</button>
        </div>
    </div>

);
export default FormBase;
