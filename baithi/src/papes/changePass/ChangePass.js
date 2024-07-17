import { useState } from 'react';
import { changePassword } from '../../service/apiService';
import Header from '../../components/header/Header';
import './ChangePass.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChangePass() {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');
    const hanndleChangePass = async () => {
        if(newPass!==rePass){
            toast.error("Mật khẩu mới không trùng khớp");
            return;
        }
        let res = await changePassword(pass, newPass);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success("Change password Success !!!!");
            setNewPass(''); setPass('');
            setRePass('');
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <>
        <Header />
        <ToastContainer />
        <div className='change-title'>
            <h2>Change Password For User</h2>
        </div>
        <div className="changePass">
            <div className="col-md-6">
                <label className="form-label">Old Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-3">
                <label className="form-label">New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                />
            </div>
            <div className="col-md-6 mt-3">
                <label className="form-label">Comfirm New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={rePass}
                    onChange={(e) => setRePass(e.target.value)}
                />
            </div>
            <div className="chang-pass">
                <button className="btn btn-warning" onClick={() => hanndleChangePass()}>
                    Save
                </button>
            </div>
        </div>
        </>
    );
}

export default ChangePass;
