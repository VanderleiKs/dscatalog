import { Category } from '../ListCategories';
import './styles.scss';

type Props = {
    category: Category;
    handleRemove: (categoryId: number) => void;
}

const CardCategories = ({ category, handleRemove }: Props) => {

    return (
        <div className="card-base card-categories col-12">
            <h2 className="admin-card-category-title col-6">{category.name}</h2>
            <div className="col-3">
                <button className="btn btn-outline-secondary btn-block admin-button-card-category">EDITAR</button>
            </div>
            <div className="col-3">
                <button className="btn btn-outline-danger btn-block admin-button-card-category"
                    onClick={() => handleRemove(category.id)}
                >
                    EXCLUIR
                </button>
            </div>
        </div>

    );
}

export default CardCategories;