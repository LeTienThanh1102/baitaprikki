import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import _ from 'lodash';
import useUserManager from './useUserManage';

function ModelUpdate({ show, setShow, dataUpdate, resetUpdate }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUername] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [prevew, setreview] = useState('');
    const {editUpdateUser}=useUserManager();
    const handleClose = () => {
        setShow(false);
        resetUpdate();
    };
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setRole(dataUpdate.role);
            setUername(dataUpdate.username);
            setImage('');
            if (dataUpdate.image) {
                setreview(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);
    const handleUpload = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    };
    const handleSubmited = async () => {
        let data = await editUpdateUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            handleClose();
        }
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
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={pass}
                                disabled
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Dicription</label>
                            <input type="text" className="form-control" placeholder="......." />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected disabled>
                                    Seclect Role
                                </option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label lable-upload" htmlFor="active">
                                <FiPlusCircle />
                                Upload File Image
                            </label>
                            <input type="file" id="active" hidden onChange={(e) => handleUpload(e)} />
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
                    <Button variant="primary" onClick={() => handleSubmited()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModelUpdate;

