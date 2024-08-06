import { useState, useEffect } from 'react';
import { DeleteUser, getAllUser, getUserPaginate, postCreatUser, putUpdateUser } from '../../../../service/apiService';
import { toast } from 'react-toastify';

const useUserManager = () => {
    const limit = 4;
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    useEffect(()=>{
        fetchListUserWithPaginate(1);
    },[])
    const fetchListUser = async () => {
        const res = await getAllUser();
        if (res && res.EC === 0) {
            setListUser(res.DT);
        } else {
            toast.error('Failed to fetch users');
        }
    };
    
    const fetchListUserWithPaginate = async (page: number) => {
        const res = await getUserPaginate(page, limit);
        if (res.EC === 0) {
            setPageCount(res.DT.totalPages);
            setListUser(res.DT.users);
        } else {
            toast.error('Failed to fetch paginated users');
        }
    };

    const createUser = async (email, pass, username, role, image) => {
        const data = await postCreatUser(email, pass, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            fetchListUserWithPaginate(1);
        } else {
            toast.error(data.EM);
        }
        return data;
    };

    const editUpdateUser = async (id, username, role, image) => {
        const data = await putUpdateUser(id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            fetchListUserWithPaginate(1);
        } else {
            toast.error(data.EM);
        }
        return data;
    };

    return {
        listUser,
        pageCount,
        setListUser,
        fetchListUserWithPaginate,
        createUser,
        fetchListUser,
        editUpdateUser,
    };
};

export default useUserManager;
