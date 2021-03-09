import React from 'react';
import Login from '../Login';
import './styles.scss';

type Prop = {
    title: string;
    children: React.ReactNode;
}

const AuthCard = ({title, children}: Prop) => {

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