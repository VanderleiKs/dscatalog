import SearchCategories from "core/components/SearchCategories";
import history from "core/utils/history";
import { makePrivateRequest } from "core/utils/Request";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardCategories from "../Card";

export type catResponse = {
    content: Category[];
}

export type Category = {
    id: number;
    name: string;
}

const ListCategories = () => {
    const [cat, setCat] = useState<catResponse>();

    const getCategories = useCallback(() => {
        makePrivateRequest({ url: "/categories" })
        ?.then(response => setCat(response.data));
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleRemove = (categoryId: number) => {
        makePrivateRequest({
            method: "DELETE",
            url: `/categories/${categoryId}`
        })
        ?.then(() => {
            toast.success("Categoria removida com sucesso!");
            getCategories();
        })
        .catch(() => toast.error("Erro ao remover categoria!"));
    }

    const handleCreate = () => {
        history.push("/admin/categories/create")
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg button-add" onClick={handleCreate}>ADICIONAR</button>
               <SearchCategories />
            </div>
            <div className="admin-container-cards">
                {cat?.content.map(category => (
                    <CardCategories handleRemove={handleRemove} key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}

export default ListCategories;