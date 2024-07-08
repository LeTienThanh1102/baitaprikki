import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../service/apiService';

function ModelDeleteQuiz({ show, setShow, dataDelete, fetchQuiz }) {
    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            fetchQuiz();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            handleClose();
        }
        setShow(false);
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete User. <b> </b>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitDeleteQuiz();
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModelDeleteQuiz;
