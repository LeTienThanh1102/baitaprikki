import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { postCreatUser } from '../../../../service/apiService';
import { validateEmail } from '../../../../util/validate';
import { Role } from '../../../../util/user';
import useUserManager from './useUserManage';

function ModalCreateUser({ show, setShow, fetchListUserWithPaginate }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUername] = useState('');  
    const [image, setImage] = useState('');
    const [role, setRole] = useState(Role.USER);
    const [prevew, setreview] = useState('');
    const {createUser}=useUserManager();

    
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPass('');
        setRole('');
        setImage('');
        setUername('');
        setreview('');
    };
    const handleUpload = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } 
    }
    const handleSubmited = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (!pass) {
            toast.error('Invalid Password');
            return;
        }
        let data = await createUser(email, pass, username, role, image);
        if (data && data.EC === 0) {
            fetchListUserWithPaginate(1);
            handleClose();
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={pass}
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
                            <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                                <option value={Role.USER}>USER</option>
                                <option value={Role.ADMIN}> ADMIN</option>
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
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;
