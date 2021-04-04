import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search_icon.svg';
import { useEffect, useState } from 'react';


const SearchCategories = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        console.log(name);
    }, [name])

    return (
        <div className="container-search-categories card-base">
            <div className="search-categories-input">
                <input className="form-control input-base"
                    name={name}
                    type="text"
                    placeholder="Pesquisar categoria"
                    onChange={(e) => setName(e.target.value)}
                    />
                <SearchIcon />
            </div>
            <button className="btn btn-outline-secondary border-radius-10">LIMPAR FILTRO</button>
        </div>

    )
}
export default SearchCategories;