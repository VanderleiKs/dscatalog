import { ReactComponent as SearchIcon } from 'core/assets/images/search_icon.svg';
import './styles.scss';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    handleCleanFilter: () => void;
}

const SearchCategories = ({ name, handleChangeName, handleCleanFilter }: Props) => {

    return (
        <div className="container-search-categories card-base">
            <div className="search-categories-input">
                <input className="form-control input-base"
                    value={name}
                    type="text"
                    placeholder="Pesquisar categoria"
                    onChange={(e) => handleChangeName(e.target.value)}
                />
                <SearchIcon />
            </div>
            <button className="btn btn-outline-secondary border-radius-10"
                onClick={handleCleanFilter}>
                    LIMPAR FILTRO
            </button>
        </div>

    )
}
export default SearchCategories;