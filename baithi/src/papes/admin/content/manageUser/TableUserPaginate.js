import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import useUserManager from './useUserManage';

function TableUserPaginate({handleUpdateShow, handleDeleteShow, pageCount }) {
    const {listUser,fetchListUserWithPaginate } = useUserManager();
    const handlePageClick = (event) => {
        fetchListUserWithPaginate(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No_Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role ==1 ? 'USER':'ADMIN'}</td>
                                <td>
                                    <button className="btn btn-secondary">View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => handleUpdateShow(item)}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteShow(item)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan={5}>Not Found Data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="user-paginate d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default TableUserPaginate;
