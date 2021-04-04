import { ReactComponent as SearchIcon } from 'core/assets/images/search_icon.svg';
import { makeRequest } from 'core/utils/Request';
import { Category } from 'pages/admin/components/Categories/ListCategories';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss';

type Props = {
    name?: string;
    category?: Category;
    handleChangeName: (name: string) => void;
    handleChangeCategory: (category: Category) => void;
    cleanFilterSearch: () => void;
}

const SearchProducts = ({name, category, handleChangeName, handleChangeCategory, cleanFilterSearch}: Props) => {
    const [isLOadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: "/categories" })
            .then((response) => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, [])

    return (
        <div className="container-search card-base">
            <div className="input-search-name">
                <input className="input-base form-control"
                    type="text"
                    value={name}
                    placeholder="Pesquisar Produto"
                    onChange={e => handleChangeName(e.target.value)}
                />
                <SearchIcon />
            </div>
            <div className="category-search">
                <Select
                    name="categories"
                    key={`select-${category?.id}`}
                    value={category}
                    isClearable
                    isLoading={isLOadingCategories}
                    classNamePrefix="category-seach-product"
                    placeholder="Filtrar por Categoria"
                    options={categories}
                    getOptionLabel={(option: Category) => option.name}
                    getOptionValue={(option: Category) => String(option.id)}
                    onChange={option => handleChangeCategory(option as Category)}
                />
            </div>
            <button className="btn btn-outline-secondary border-radius-10" 
            onClick={() => cleanFilterSearch()}>LIMPAR FILTRO</button>

        </div>

    )
}

export default SearchProducts;