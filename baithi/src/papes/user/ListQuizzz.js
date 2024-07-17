import { useEffect, useState } from 'react';
import './List.scss';
import { getListQuizbyUser } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
function ListQuizzz() {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getListQuizbyUser();
        if (res.EC === 0 && res) {
            setArrQuiz(res.DT);
        }
        console.log(res);
    };

    return (
        <>
        <Header />
        <div className="quizz-list">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div className="quiz-item">
                            <div key={index} className="    " style={{ width: '18rem' }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button
                                        onClick={() =>
                                            navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })
                                        }
                                        className="btn btn-primary"
                                    >
                                        Start Nowww
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
        </>
    );
}

export default ListQuizzz;
