import ButtonIcon from 'core/components/ButtonIcon';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/Request';
import { saveSessionData } from 'core/utils/Auth';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit} = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.push("/admin/products")
        })
        .catch(() => setHasError(true));     
    }

    return(
        <AuthCard title="login">
            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}
            <form className="form-loginAdmin" onSubmit={handleSubmit(onSubmit)}>
                <input type="email"
                 placeholder="Email"
                 className="form-control input-base margin-botton-25" 
                 name="username" 
                 ref={register({ required: true})}
                />
                 <input type="password"
                 placeholder="Senha"
                 className="form-control input-base"
                 name="password" 
                 ref={register({ required: true})} 
                />
                <Link to="/admin/auth/recover" className="link-recover-login">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon name="Logar" /> 
                </div>
                <div className="d-flex justify-content-center">
                    <h1 className="login-pergunta-cadastro">Não tem cadastro?</h1>
                    <Link className="login-link-cadastro" to="/admin/auth/register">CADASTRAR</Link>
                </div>
                
            </form>

        </AuthCard>

    )

}


export default Login;