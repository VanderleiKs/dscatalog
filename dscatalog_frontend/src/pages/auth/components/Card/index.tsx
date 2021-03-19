import React from 'react';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const AuthCard = ({title, children}: Props) => {

    return (
        <div className="container-authcard">
            <h1 className="card-title">
                {title}
            </h1>
            <div>
            {children}
            </div>
            
        </div>

    )

}

export default AuthCard;