import { type } from 'os';
import React from 'react';

type Props = {
    text?: String;
}

const Alert = ({text}: Props) => {
    let t1 = 0;
    for(var i = 0; i < 10; i++){
        
        
        t1++
    }

return (
    <div className="alert alert-success">
        Bem vindo, deu certo! {text}</div>
    
    );

}

export default Alert;