import { useEffect, useState } from 'react';
import './List.scss';
import { getAllDataQuizForAdmin, getListQuizbyUser } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { DataType } from '../../type/DataType';

interface Quiz {
    id: string;
    description: string;
    image: string;
    difficulty: string;
}
function ListQuizzz() {
    const [arrQuiz, setArrQuiz] = useState<Quiz[]>([]);
    const navigate = useNavigate();
    const [option, setOption]=useState<string>('');

    useEffect(() => {
        getQuizData();
    }, [option]);

    const getQuizData = async () => {
        const res : DataType = await getAllDataQuizForAdmin();
        if(option===''){
            setArrQuiz(res.DT);
        }
        else if (res.EC === 0 && res) {
            const easyQuizzes = res.DT.filter((quiz:Quiz) => quiz.difficulty === option);
                setArrQuiz(easyQuizzes);
        }
    };
    return (
        <>
        <Header />
        <div className="quizz-list">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div key={index} className="quiz-item">
                            <div  className="    " style={{ width: '18rem' }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1} :</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button
                                        onClick={() =>
                                            navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })
                                        }
                                        className="button-start"
                                    >
                                        Start Nowww
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        <div className='option-level'>
            <select className="form-select1" onChange={(e) => setOption(e.target.value)} >
                <option selected value="">Tất cả</option>
                <option value="EASY" >EASY/ Dễ</option>
                <option value="MEDIUM" >MEDIUM/ Trung bình</option>
                <option value="HARD">HARD / Khó</option>
            </select>
        </div>
        </div>
        </>
    );
}

export default ListQuizzz;
