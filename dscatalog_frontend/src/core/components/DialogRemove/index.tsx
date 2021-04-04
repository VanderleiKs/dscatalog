import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    onRemove: () => {id: number};
    id: number;
    setCard: Boolean;
}

const DialogRemove = ({ onRemove, id, setCard }: Props) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const handleClose = () => setIsRemoving(false);

    setCard && setIsRemoving(true);

    return (
        <>
            <Modal show={isRemoving} backdrop="static"
                keyboard={false}>
                <Modal.Header bsPrefix="modal-header">
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir o Produto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => onRemove}>
                        Confimar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default DialogRemove;