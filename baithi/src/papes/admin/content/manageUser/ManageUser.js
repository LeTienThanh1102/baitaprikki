import './ManageUser.scss';
import { LuUserPlus2 } from 'react-icons/lu';
import ModelUpdate from './ModelUpdate';
import ModelDelete from './ModelDelete';
import TableUserPaginate from './TableUserPaginate';
import { useEffect, useState } from 'react';
import { getAllUser, getUserPaginate } from '../../../../service/apiService';
import ModalCreateUser from './ModalCreateUser';
function ManageUser() {
    const limit = 5;
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        // fecthlistUeser();
        fecthlistUeserWithPaginate(1);
    }, []);
    const fecthlistUeser = async () => {
        let res = await getAllUser();
        // console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };
    const fecthlistUeserWithPaginate = async (page) => {
        let res = await getUserPaginate(page, limit);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };
    const resetUpdate = () => {
        setDataUpdate({});
    };
    const handleShow=()=>{
        setShow(true);
    }
    const handleDeleteShow=(user)=>{
        setShowDelete(true);
        setDataDelete(user);
    }
    const handleUpdateShow=(user)=>{
        setShowUpdate(true);
        setDataUpdate(user);
    };
    return ( 
        <div className="manage_container" >
        <div className="titile"> Manager User</div>
        <div className="user-content" >
            <div className="user-add">
                <button className="user-name" onClick={() => handleShow()}>
                    <LuUserPlus2 className="icon-user" />
                    Add New User
                </button>
            </div>
            <div className="btn-table-user" >
                {/* <TableUser
                    listUser={listUser}
                    setListUser={setListUser}
                    handleUpdateShow={handleUpdateShow}
                    handleDeleteShow={handleDeleteShow}
                /> */}
                <TableUserPaginate
                    listUser={listUser}
                    setListUser={setListUser}
                    handleUpdateShow={handleUpdateShow}
                    handleDeleteShow={handleDeleteShow}
                    fecthlistUeserWithPaginate={fecthlistUeserWithPaginate}
                    pageCount={pageCount}
                />
            </div>
            <ModalCreateUser show={show} setShow={setShow} fecthlistUeser={fecthlistUeser} />
            <ModelUpdate
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                fecthlistUeser={fecthlistUeser}
                resetUpdate={resetUpdate}
            />
            <ModelDelete
                show={showDelete}
                setShow={setShowDelete}
                dataDelete={dataDelete}
                fecthlistUeser={fecthlistUeser}
            />
        </div>
    </div>
     );
}

export default ManageUser;