import history from 'core/utils/history';
import { makePrivateRequest, makeRequest } from 'core/utils/Request';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import FormBase from '../FormBase';
import './styles.scss';


type FormState = {
    name: string,
    price: string,
    categories: Category[],
    description: string
    imgUrl: string;
}

type Category = {
    id: number;
    name: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { handleSubmit, register, errors, setValue, control } = useForm<FormState>();
    const [isLOadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';


    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: "/categories" })
            .then((response) => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, [])

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('categories', response.data.categories);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);

                })
        }
    }, [productId, isEditing, setValue])

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            method: isEditing ? "PUT" : "POST",
            url: isEditing ? `/products/${productId}` : "/products",
            data
        })
            ?.then(() => {
                toast.success("Produto salvo com sucesso!");
                history.goBack();
            })
            .catch(() => toast.error("Erro ao salvar produto!"));
    }

    const handleCancel = () => {
        history.replace("/admin/products");
    }   

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormBase
                title={isEditing ? "EDITAR PRODUTO" : "CADASTRAR PRODUTO"}
                nameButtonCad={isEditing ? "SALVAR" : "CADASTRAR"}
                handleCancel={handleCancel}
            >
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
                            <Controller
                                name="categories"
                                as={Select}
                                rules={{ required: true }}
                                control={control}
                                defaultValue=''
                                isLoading={isLOadingCategories}
                                isMulti
                                classNamePrefix="category-select"
                                placeholder="Categoria"
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo Obrigatório
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