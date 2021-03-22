import history from 'core/utils/history';
import { makePrivateRequest } from 'core/utils/Request';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBase from '../FormBase';
import { toast } from 'react-toastify';


type FormState = {
    name: string,
    price: string,
    categories: string,
    description: string
    imgUrl: string;
}

type catResponse = {
    content: Categories[];
}

type Categories = {
    id: number;
    name: string;
}

const Form = () => {
    const { handleSubmit, register, errors } = useForm<FormState>();
    const [categories, setCategories] = useState<catResponse>();

    useEffect(() => {
        makePrivateRequest({ url: "/categories" })
            ?.then((response) => setCategories(response.data));
    }, [])

    const onSubmit = (data: FormState) => {
        const payLoad = {
            ...data,
            categories: [{ id: data.categories }]
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
                        <div className="margin-botton-25">
                            <input type="text"
                                name="name"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 5, message: "O campo deve ter no mínimo 5 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres" }
                                })}
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-botton-25">
                            <input type="number"
                                name="price"
                                className="form-control input-base"
                                placeholder="Preço"
                                ref={register({ required: "Campo Obrigatório", pattern: /[0-9]/ })}
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-botton-25">
                            <input type="text"
                                name="imgUrl"
                                className="form-control input-base"
                                placeholder="url da imagen"
                                ref={register({ required: "Campo Obrigatório" })}
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <select className="form-control input-base"
                                name="categories"
                                ref={register({ required: "Campo Obrigatório" })}
                            >
                                {categories?.content.map(categorie => (
                                    <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    {errors.categories.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            rows={10}
                            ref={register({ required: "Campo Obrigatório" })}
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </FormBase>
        </form>
    );
}

export default Form;