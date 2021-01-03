import { makeRequest } from 'core/utils/Request';
import React, { useState } from 'react';
import FormBase from '../FormBase';

type typeForm = React.ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement>;

type formState = {
    name: string,
    price: string,
    categories: string,
    description: string
}

const Form = () => {
    const [formData, setFormData] = useState<formState>({
        name: '',
        price: '',
        categories: '',
        description: ''
    });

    const handleOnChange = (event: typeForm) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payLoad = {
            ...formData,
            categories: [{id: formData.categories}]
        }
        console.log(payLoad);

        makeRequest({ method: "POST", url: "/products", data: payLoad })
        .then(() => setFormData({name: '', price: '', description: '', categories: '' }));
    }


    return (
        <form onSubmit={handleSubmit}>
            <FormBase title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nome do produto"
                            onChange={handleOnChange}
                        />
                        <input type="text"
                            name="price"
                            className="form-control my-2"
                            placeholder="Preço"
                            onChange={handleOnChange}
                        />
                        <input type="text"
                            name="imgUrl"
                            className="form-control"
                            placeholder="url da imagen"
                            onChange={handleOnChange}
                        />
                        <select className="form-control"
                            name="categories"
                            onChange={handleOnChange}
                        >
                            <option value="2">Computadores</option>
                            <option value="3">Eletrônicos</option>
                            <option value="1">Livros</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            className="form-control" rows={10}
                            onChange={handleOnChange} />
                    </div>
                </div>
            </FormBase>
        </form>
    );
}

export default Form;