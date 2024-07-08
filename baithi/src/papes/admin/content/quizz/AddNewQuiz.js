import { useEffect, useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { FiPlusCircle } from 'react-icons/fi';
import { type } from '@testing-library/user-event/dist/type';
import { getAllDataQuizForAdmin, postCreateNewQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModelDeleteQuiz from './ModelDeleteQuiz';
import ModelUpdateQuiz from './ModelUpdateQuiz';
function AddNewQuiz() {
    const [name, setnName] = useState('');
    const [des, setDes] = useState('');
    const [image, setImage] = useState('');
    const [level, setLevel] = useState('');
    const [prevew, setreview] = useState('');

    const [listQuiz, setListQuiz] = useState([]);
    const [isShowDeleteQuiz, setIsShowDeleteQuiz] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState([]);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState([]);
    const [isShowUpdateQuiz, setIsShowUpdateQuiz] = useState(false);
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const handleUploadImg = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setreview('')
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllDataQuizForAdmin();
        console.log(res);
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name || !des) {
            toast.error('Name/ Description is required');
            return;
        }

        let res = await postCreateNewQuiz(des, name, level.value, image);
        console.log(res);
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
            toast.success(res.EM);
            setnName('');
            setDes('');
            setLevel('');
            setImage('');
            setreview('');
        } else {
            toast.error(res.EM);
        }
    };
    const handleDeleteQuiz = (quizz) => {
        setIsShowDeleteQuiz(true);
        setDataDeleteQuiz(quizz);
    };
    const handleUpdateQuiz = (quizz) => {
        setIsShowUpdateQuiz(true);
        setDataUpdateQuiz(quizz);
    };
    return (
        <>
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your quiz name"
                            value={name}
                            onChange={(e) => setnName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description...."
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select
                            options={options}
                            value={level}
                            placeholder="Quiz Type....."
                            defaultValue={level}
                            onChange={setLevel}
                        />
                    </div>
                    <div className="more-action">
                        <label className="form-label lable-upload upload" htmlFor="active">
                            <FiPlusCircle />
                            Upload File Image
                        </label>
                        <input type="file" id="active" hidden onChange={(e) => handleUploadImg(e)}></input>
                    </div>
                    <div className=" col-md-12 img-review">
                        {prevew ? <img src={prevew} className="img-review-upload" /> : <div></div>}
                    </div>

                    <div className="mt-3 button-save">
                        <button className="btn btn-warning" onClick={() => handleSubmitQuiz()}>
                            Save
                        </button>
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                <div className="table-title mb-3"> List Quizzz.... </div>
                <TableQuiz
                    handleUpdateQuiz={handleUpdateQuiz}
                    handleDeleteQuiz={handleDeleteQuiz}
                    listQuiz={listQuiz}
                    setListQuiz={setListQuiz}
                />
                <ModelDeleteQuiz
                    show={isShowDeleteQuiz}
                    setShow={setIsShowDeleteQuiz}
                    dataDelete={dataDeleteQuiz}
                    fetchQuiz={fetchQuiz}
                />
                <ModelUpdateQuiz
                    show={isShowUpdateQuiz}
                    setShow={setIsShowUpdateQuiz}
                    dataUpdate={dataUpdateQuiz}
                    fetchQuiz={fetchQuiz}
                />
            </div>
        </>
    );
}

export default AddNewQuiz;
