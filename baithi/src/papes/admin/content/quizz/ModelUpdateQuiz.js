import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateQuizz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import { FiPlusCircle } from 'react-icons/fi';
import _ from 'lodash';

function ModelUpdateQuiz({ show, setShow, dataUpdate, fetchQuiz }) {
    const [name, setnName] = useState('');
    const [des, setDes] = useState('');
    const [image, setImage] = useState('');
    const [level, setLevel] = useState('');
    const [prevew, setreview] = useState('');
    const handleClose = () => {
        setShow(false);
    };
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setDes(dataUpdate.description);
            setLevel(dataUpdate.difficulty);
            setnName(dataUpdate.name);
            setImage(dataUpdate.image);
            if (dataUpdate.image) {
                setreview(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);
    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setreview('')
        }
    };
    const handleSubmitedQuiz = async () => {
        let data = await putUpdateQuizz(dataUpdate.id, des, name, level, image);
        console.log('data', data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await fetchQuiz();
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
            <Modal show={show} onHide={handleClose} size="xl" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setnName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Level</label>
                            <select className="form-select" onChange={(e) => setLevel(e.target.value)}>
                                <option selected value="Level Quizz" disabled>
                                    Level Quizz
                                </option>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM"> MEDIUM</option>
                                <option value="HARD"> HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label lable-upload" htmlFor="active">
                                <FiPlusCircle />
                                Upload File Image
                            </label>
                            <input type="file" id="active" hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className=" col-md-12 img-review">
                            {prevew ? <img src={prevew} /> : <span> review imgae</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitedQuiz()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelUpdateQuiz;
