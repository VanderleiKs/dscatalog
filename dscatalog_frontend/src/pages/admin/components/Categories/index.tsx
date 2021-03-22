import { makePrivateRequest } from "core/utils/Request";
import { useEffect, useState } from "react";
import CardCategories from "./Card";

export type catResponse = {
    content: Category[];
}

export type Category = {
    id: number;
    name: string;
}

const Categories = () => {
    const [cat, setCat] = useState<catResponse>();

    useEffect(() => {
        makePrivateRequest({url:"/categories"})
        ?.then(response => setCat(response.data));
    }, []);

    return(
        <div className="container-cards mt-5 d-grid">
            {cat?.content.map(category => (
                <CardCategories key={category.id} name={category.name} />
            ))}
        </div>
       
    );
}

export default Categories;