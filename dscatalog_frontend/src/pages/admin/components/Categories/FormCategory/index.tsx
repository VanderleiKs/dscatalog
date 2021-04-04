import history from "core/utils/history";
import { makePrivateRequest, makeRequest } from "core/utils/Request";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import FormBase from "../../Product/FormBase";

type FormState = {
    name: string;
}

type ParamsType = {
    categoryId: string;
}

const FormCategory = () => {
    const { handleSubmit, register, errors, setValue } = useForm<FormState>();
    const { categoryId } = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => setValue('name', response.data.name));
        }
    }, [isEditing, categoryId, setValue])

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            method: isEditing ? "PUT" : "POST",
            url: isEditing ? `/categories/${categoryId}` : "/categories",
            data
        })?.then(() => {
            toast.success("Categoria salva com Sucesso!");
            history.goBack();
        })
            .catch(() => toast.error("Erro ao salvar categoria!"));
    }

    const handleCancel = () => {
        history.replace("/admin/categories");
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormBase title={isEditing ? "EDITAR CATEGORIA" : "CADASTRAR CATEGORIA"}
                nameButtonCad={isEditing ? "SALVAR" : "CADASTRAR"}
                handleCancel={handleCancel}>
                <div className="">
                    <input type="text"
                        name="name"
                        className="input-base form-control"
                        placeholder="Nome da Categoria"
                        ref={register({ required: "Campo Obrigatorio" })}
                    />
                    {errors.name?.message && (
                        <div className="invalid-feedback d-block">
                            {errors.name.message}
                        </div>
                    )}
                </div>

            </FormBase>
        </form>
    )
}
export default FormCategory;