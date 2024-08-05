import './DashBoard.scss';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getDashBoard } from '../../../service/apiService';
import { useEffect, useState } from 'react';
function DashBoard() {
    const [dataOver, setDataOver] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);
    const fetchdata = async () => {
        let res = await getDashBoard();
        if (res && res.EC === 0) {
            setDataOver(res.DT);
            let qz = 0,
                qs = 0,
                an = 0;
            qz = res?.DT?.others?.countQuiz ?? 0;
            qs = res?.DT?.others?.countQuestions ?? 0;
            an = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    name: 'Quizzes',
                    Qz: qz,
                },
                {
                    name: 'Questions',
                    Qs: qs,
                },
                {
                    name: 'Answers',
                    An: an,
                },
            ];
            setDataChart(data);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dash-title">Analytics Dashboard</div>
            <div className="dash-content">
                <div className="dash-left">
                    <div className="dash-item" style={{ background: '#f0a97a' }}>
                        <span className="item-1">Total User:</span>
                        <span className="item-2">
                            {dataOver && dataOver.users && dataOver.users.total ? <>{dataOver.users.total}</> : <>0</>}
                        </span>
                    </div>
                    <div className="dash-item" style={{ background: '#f0e5a8' }}>
                        <span className="item-1">Total Quizzz:</span>
                        <span className="item-2">
                            {/* 
                            <>{dataOver && dataOver.others && dataOver.others.countQuiz ?
                                dataOver.others.countQuiz
                                : 0
                            }</> */}
                            {dataOver && dataOver.others && dataOver.others.countQuiz ? 
                                dataOver.others.countQuiz
                             : 
                                0
                            }
                        </span>
                    </div>
                    <div className="dash-item" style={{ background: '#7aa3f0' }}>
                        <span className="item-1">Total Question:</span>
                        <span className="item-2">
                            {dataOver && dataOver.others && dataOver.others.countQuestions ? (
                                <>{dataOver.others.countQuestions}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="dash-item" style={{ background: '#84f07a' }}>
                        <span className="item-1">Total Answer:</span>
                        <span className="item-2">
                            {dataOver && dataOver.others && dataOver.others.countAnswers ? (
                                <>{dataOver.others.countAnswers}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                </div>
                <div className="dash-right">
                    <ResponsiveContainer width="95%" height={'100%'}>
                        <BarChart data={dataChart}>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="An" fill="#c53e00" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;