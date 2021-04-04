import history from "core/utils/history";
import { makePrivateRequest } from "core/utils/Request";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormBase from "../../Product/FormBase";

type FormState = {
    name: string;
}

const FormCategory = () => {
    const { handleSubmit, register, errors } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            method: "POST",
            url: "/categories",
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
            <FormBase title="CADASTRAR CATEGORIA" nameButtonCad="CADASTRAR" handleCancel={handleCancel}>
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