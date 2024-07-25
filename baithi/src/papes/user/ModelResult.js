import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelResult({ show, setShow, dataModel, handleShowAnswer }) {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Bạn đã hoàn thành xong bài thi!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total Question: <b> {dataModel.countTotal} </b>
                    </div>
                    <div>
                        {' '}
                        Total Correct Answers: <b> {dataModel.countCorrect} </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                            handleShowAnswer();
                        }}
                    >
                        Show Answers
                    </Button>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelResult;
