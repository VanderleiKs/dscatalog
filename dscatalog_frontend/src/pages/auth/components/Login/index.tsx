import ButtonIcon from 'core/components/ButtonIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit} = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return(
        <AuthCard title="login">
            <form className="form-loginAdmin" onSubmit={handleSubmit(onSubmit)}>
                <input type="email"
                 placeholder="Email"
                 className="form-control input-base margin-botton-25" 
                 name="email" 
                 ref={register}
                />
                 <input type="password"
                 placeholder="Senha"
                 className="form-control input-base"
                 name="password" 
                 ref={register} 
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