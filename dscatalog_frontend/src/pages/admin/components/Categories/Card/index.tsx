import { Category } from '../ListCategories';
import { Button, Modal } from 'react-bootstrap';
import './styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    category: Category;
    handleRemove: (categoryId: number) => void;
}

const CardCategories = ({ category, handleRemove }: Props) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const handleClose = () => setIsRemoving(false);

    return (
        <>
            <Modal show={isRemoving} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header bsPrefix="modal-header">
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir a Categoria?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => handleRemove(category.id)}>
                        Confimar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="card-base card-categories col-12">
                <h2 className="admin-card-category-title col-6">{category.name}</h2>
                <div className="col-3">
                    <Link to={`/admin/categories/${category.id}`}>
                        <button className="btn btn-outline-secondary btn-block admin-button-card-category">
                            EDITAR
                    </button>
                    </Link>
                </div>
                <div className="col-3">
                    <button className="btn btn-outline-danger btn-block admin-button-card-category"
                        onClick={() => setIsRemoving(true)}
                    >
                        EXCLUIR
                </button>
                </div>
            </div>
        </>
    );
}

export default CardCategories;