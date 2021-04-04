import Pagination from "core/components/Pagination";
import SearchCategories from "core/components/SearchCategories";
import history from "core/utils/history";
import { makePrivateRequest, makeRequest } from "core/utils/Request";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardCategories from "../Card";

export type catResponse = {
    content: Category[];
    totalPages: number;
}

export type Category = {
    id: number;
    name: string;
}

const ListCategories = () => {
    const [cat, setCat] = useState<catResponse>();
    const [name, setName] = useState('');
    const [activePage, setActivePage] = useState(0);

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            name: name
        }
        makeRequest({ url: "/categories", params })
            ?.then(response => setCat(response.data));
    }, [activePage, name]);

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

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const handleCleanFilter = () => {
        setActivePage(0);
        setName('');
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg button-add" onClick={handleCreate}>ADICIONAR</button>
                <SearchCategories name={name}
                    handleChangeName={handleChangeName}
                    handleCleanFilter={handleCleanFilter} />
            </div>
            <div className="admin-container-cards">
                {cat?.content.map(category => (
                    <CardCategories handleRemove={handleRemove} key={category.id} category={category} />
                ))}
            </div>
            {cat && (
                <Pagination
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                    totalPages={cat?.totalPages}
                />
            )}
        </div>
    );
}

export default ListCategories;