import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../../../../service/apiService';
import { toast } from 'react-toastify';
function ModelDelete({ show, setShow, dataDelete, fecthlistUeser }) {
    const handleClose = () => setShow(false);
    const handleSubmitDelete = async () => {
        let data = await DeleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            fecthlistUeser();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            handleClose();
        }
        setShow(false);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete User. <b> {dataDelete.email}</b>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitDelete();
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDelete;
