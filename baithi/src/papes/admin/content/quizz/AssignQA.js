import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllDataQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
function AssignQA() {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllDataQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `Đề ${item.id} - ${item.name}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };
    const fetchUser = async () => {
        let res = await getAllUser();
        // console.log(res);
        if (res && res.EC === 0) {
            let user = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUser(user);
        }
    };
    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="assign-container row">
            <div className="col-6 form-group">
                <label> Select quizz</label>
                <Select
                    options={listQuiz}
                    placeholder="Quiz Type....."
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    className="from-control"
                />
            </div>
            <div className="col-6 form-group">
                <label> Select User:</label>
                <Select options={listUser} defaultValue={selectedUser} onChange={setSelectedUser} />
            </div>
            <div>
                <button
                    className="btn btn-warning mt-3"
                    onClick={() => {
                        handleAssign();
                    }}
                >
                    {' '}
                    Assign{' '}
                </button>
            </div>
        </div>
    );
}

export default AssignQA;
