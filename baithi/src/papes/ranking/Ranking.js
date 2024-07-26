import { useEffect, useState } from 'react';
import { getHistory } from '../../service/apiService';
import moment from 'moment';
import Header from '../../components/header/Header';
import './Ranking.scss';
function Ranking() {
    const [listHistory, setListHistory] = useState([]);
    useEffect(() => {
        fetchHistory();
    },[]);
    const fetchHistory = async () => {
        let res = await getHistory();
        console.log(res);
        if (res && res.EC === 0) {
            let newData = res.DT.data.map((item) => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item.quizHistory.name ?? '',
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A'),
                    diemm: parseInt(item.total_correct * 10),
                };
            });
            if (newData.length > 20) {
                newData = newData.slice(newData.length - 20, newData.length);
            }
            newData.sort((a,b)=> b.diemm - a.diemm)
            setListHistory(newData);
        }
    };
    return (
        <div>
            <Header />
            <div className='ranking-container'>
                <div className='ranking-title'>
                    <h2> Bảng xếp hạng của bạn</h2>
                </div>
                <div className='table-result' style={{ width:"80%"}}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Quiz Name</th>
                                <th scope="col">Total Question</th>
                                <th scope="col">Total Correct</th>
                                <th scope="col">Point</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listHistory &&
                                listHistory.length > 0 &&
                                listHistory.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{item.name}</td>
                                            <td>{item.total_questions}</td>
                                            <td>{item.total_correct}</td>
                                            <td>{item.diemm}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    );
                                })}
                            {listHistory && listHistory.length === 0 && (
                                <tr>
                                    <td colSpan={4}>Not Found Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}

export default Ranking;
