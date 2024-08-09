import './ManageUser.scss';
import { LuUserPlus2 } from 'react-icons/lu';
import ModelUpdate from './ModelUpdate';
import ModelDelete from './ModelDelete';
import TableUserPaginate from './TableUserPaginate';
import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import useUserManager from './useUserManage';

function ManageUser() {
    
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const { 
        listUser,
        pageCount,
        setListUser,
        fetchListUser,
        fetchListUserWithPaginate,
        createUser,
    } = useUserManager();

    const resetUpdate = () => {
        setDataUpdate({});
    };
  
    const handleShow = () => {
        setShow(true);
    };

    const handleDeleteShow = (user) => {
        setShowDelete(true);
        setDataDelete(user);
    };

    const handleUpdateShow = (user) => {
        setShowUpdate(true);
        setDataUpdate(user);
    };

    return (
        <div className="manage_container">
            <div className="titile">Manager User</div>
            <div className="user-content">
                <div className="user-add">
                    <button className="user-name" onClick={handleShow}>
                        <LuUserPlus2 className="icon-user" />
                        Add New User
                    </button>
                </div>
                <div className="btn-table-user">
                    <TableUserPaginate
                        listUser={listUser}
                        handleUpdateShow={handleUpdateShow}
                        handleDeleteShow={handleDeleteShow}
                        pageCount={pageCount}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                    />
                </div>
                <ModalCreateUser show={show} setShow={setShow} fetchListUserWithPaginate={fetchListUserWithPaginate} />
                <ModelUpdate
                    listUser={listUser}
                    show={showUpdate}
                    setShow={setShowUpdate}
                    dataUpdate={dataUpdate}
                    resetUpdate={resetUpdate}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
                <ModelDelete
                    show={showDelete}
                    setShow={setShowDelete}
                    dataDelete={dataDelete}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
            </div>
        </div>
    );
}

export default ManageUser;
