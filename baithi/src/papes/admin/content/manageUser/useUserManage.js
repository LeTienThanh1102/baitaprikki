import { useState, useEffect } from 'react';
import { DeleteUser, getAllUser, getUserPaginate } from '../../../../service/apiService';
import { toast } from 'react-toastify';

const useUserManager = () => {
    const limit = 5;
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        const res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT);
        } else {
            toast.error('Failed to fetch users');
        }
    };

    const fetchListUserWithPaginate = async (page: number) => {
        const res = await getUserPaginate(page, limit);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        } else {
            toast.error('Failed to fetch paginated users');
        }
    };

    const deleteUser = async (userId: number) => {
        const res = await DeleteUser(userId);
        if (res.EC === 0) {
            toast.success('User deleted successfully');
            fetchListUserWithPaginate(1); // Refresh the list after deletion
        } else {
            toast.error('Failed to delete user');
        }
    };

    const resetUpdate = () => {
        setDataUpdate({});
    };

    return {
        listUser,
        pageCount,
        dataUpdate,
        dataDelete,
        setListUser,
        setDataUpdate,
        setDataDelete,
        fetchListUser,
        fetchListUserWithPaginate,
        deleteUser,
        resetUpdate,
    };
};

export default useUserManager;
