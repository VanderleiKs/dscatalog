import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessionData } from 'core/utils/Auth';
import { makeLogin } from 'core/utils/Request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };


    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from)
            })
            .catch(() => setHasError(true));
    }

    return (
        <AuthCard title="login">
            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}
            <form className="form-loginAdmin" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-botton-25">
                    <input type="email"
                        placeholder="Email"
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''} `}
                        name="username"
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username?.message}
                        </div>
                    )}

                </div>
                <div>
                    <input type="password"
                        placeholder="Senha"
                        className={`form-control input-base ${errors.password?.message ? 'is-invalid' : ''}`}
                        name="password"
                        ref={register({
                            required: "Campo Obrigatório"
                        })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password?.message}
                        </div>
                    )}
                </div>

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