import history from 'core/utils/history';
import { makePrivateRequest } from 'core/utils/Request';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormBase from '../FormBase';
import { toast } from 'react-toastify';


type FormState = {
    name: string,
    price: string,
    categories: string,
    description: string
}

const Form = () => {
    const { handleSubmit, register } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        const payLoad = {
            ...data,
            categories: [{ id: 1 }]
        }
        makePrivateRequest({ method: "POST", url: "/products", data: payLoad })
            ?.then(() => {
                toast.success("Produto salvo com sucesso!");
                history.goBack();
            })
            .catch(() => toast.error("Erro ao salvar o produto!"));

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormBase title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input type="text"
                            name="name"
                            className="form-control input-base"
                            placeholder="Nome do produto"
                            ref={register({ required: "Campo Obrigatório" })}
                        />
                        <input type="number"
                            name="price"
                            className="form-control my-2 input-base"
                            placeholder="Preço"
                            ref={register({ required: "Campo Obrigatório", pattern: /[0-9]/ })}
                        />
                        <input type="text"
                            name="imgUrl"
                            className="form-control input-base"
                            placeholder="url da imagen"
                            ref={register({ required: "Campo Obrigatório" })}
                        />
                        <select className="form-control input-base"
                            name="categories"
                            ref={register({ required: "Campo Obrigatório" })}
                        >
                            <option value="">Selecione...</option>
                            <option value="2">Computadores</option>
                            <option value="3">Eletrônicos</option>
                            <option value="1">Livros</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            className="form-control input-base"
                            rows={10}
                            ref={register({ required: "Campo Obrigatório" })}
                        />
                    </div>
                </div>
            </FormBase>
        </form>
    );
}

export default Form;