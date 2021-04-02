import { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search_icon.svg';
import { Category } from 'pages/admin/components/Categories';
import { makeRequest } from 'core/utils/Request';
import Select from 'react-select';
import './styles.scss';

export type SearchForm = {
    name?: string,
    categoryId?: number
}

type Props = {
    onSearch: (searchForm: SearchForm) => void
}

const SearchProducts = ({onSearch}: Props) => {
    const [isLOadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: "/categories" })
            .then((response) => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, [])

    const handleChangeName = (name: string) => {
        setName(name);
        onSearch({name, categoryId: category?.id});
    }

    const handleChangeCategory = (category: Category) => {
        setCategory(category);
        onSearch({name, categoryId: category?.id});
    }

    const cleanFilterSearch = () => {
        setName('');
        setCategory(undefined);
        onSearch({});
    }

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