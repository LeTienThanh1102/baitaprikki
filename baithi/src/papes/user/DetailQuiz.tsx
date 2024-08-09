import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../service/apiService';
import './Detail.scss';
import Question from './Question';
import ModelResult from './ModelResult';
import RightContent from './RightContent';
import { DataType } from '../../type/DataType';
interface Answer {
    id: number;
    description: string;
    isSelected: boolean;
    isCorrect: boolean;
}

interface QuestionData {
    questionId: number;
    questionDes: string;
    image: string | null;
    answers: Answer[];
}

// interface QuizDataModel {
//     countCorrect: number;
//     countTotal: number;
//     quizData: any[]; // Define the exact type if possible
// }
function DetailQuiz() {
    const params = useParams<{ id: string }>();
    const quizid:string|undefined = params.id;
    const location = useLocation();

    const [dataquiz, setDataQuiz] = useState<QuestionData[]>([]);
    const [index, setIndex] = useState(0);
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const [isShowResult, setShowResult] = useState(false);
    const [dataModel, setDataModel] = useState({});

    useEffect(() => {
        fetchQuestion();
    }, [quizid]);

    // với các func như này nên chuyển sang hook cho dễ quản lý, đọc code.
    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizid);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = raw.reduce((acc: QuestionData[], item: any) => {
                let questionIndex = acc.findIndex(q => q.questionId === item.id);
                if (questionIndex === -1) {
                    acc.push({
                        questionId: item.id,
                        questionDes: item.description,
                        image: item.image,
                        answers: [{
                            id: item.answers.id,
                            description: item.answers.description,
                            isSelected: false,
                            isCorrect: false
                        }]
                    });
                } else {
                    acc[questionIndex].answers.push({
                        id: item.answers.id,
                        description: item.answers.description,
                        isSelected: false,
                        isCorrect: false
                    });
                }
                return acc;
            }, []);
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex(index - 1);
    };
    const handleNext = () => {
        if (dataquiz && dataquiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleCheckBox = (answerId: number, questionId: number) => {
        const updatedDataQuiz = dataquiz.map(question => {
            if (question.questionId === questionId) {
                return {
                    ...question,
                    answers: question.answers.map(answer =>
                        answer.id === answerId
                            ? { ...answer, isSelected: !answer.isSelected }
                            : answer
                    )
                };
            }
            return question;
        });
        setDataQuiz(updatedDataQuiz);
    };
    const handleFinish = async () => {
        console.log('check data before submit', dataquiz);
        let payload = {
            quizId: quizid,
            answers: dataquiz.map(question => ({
                questionId: question.questionId,
                userAnswerId: question.answers.filter(answer => answer.isSelected).map(answer => answer.id)
            }))
        };
            let res:DataType = await postSubmitQuiz(payload);
          
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModel({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setShowResult(true);
                const updatedDataQuiz = dataquiz.map(question => {
                    const matchedQuizData = res.DT.quizData.find((q: any) => q.questionId === question.questionId);
                    if (matchedQuizData) {
                        return {
                            ...question,
                            answers: question.answers.map(answer => ({
                                ...answer,
                                isCorrect: !!matchedQuizData.systemAnswers.find((sysAns: any) => sysAns.id === answer.id)
                            }))
                        };
                    }
                    return question;
                });
    
                setDataQuiz(updatedDataQuiz);

            } else {
                // Nên return lỗi cụ thể nếu xác định được, tránh viết chung chung ntn.
                alert('Something Wrongs......');
            }
        };

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    };

    return (
        <>
        <div className="detailquiz-main">
            <div className="left-content">
                <div className="title">
                    Quiz {quizid} : {location?.state.quizTitle}
                </div>
                <div className="quiz-body">
                    <img />
                </div>
                <div className="quiz-content">
                    <Question
                        data={dataquiz && dataquiz.length > 0 ? dataquiz[index] : []}
                        index={index}
                        isShowAnswer={isShowAnswer}
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footerr">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>
                        {' '}
                        Prev{' '}
                    </button>
                    <button className="btn btn-primary ml-3" onClick={() => handleNext()}>
                        {' '}
                        Next To{' '}
                    </button>
                    <button className="btn btn-danger ml-3" onClick={() => handleFinish()} disabled={isSubmitQuiz}>
                        {' '}
                        Finish{' '}
                    </button>
                </div>
            </div>

             <div className="right-content">
                <RightContent dataquiz={dataquiz} handleFinish={handleFinish} setIndex={setIndex} />
            </div>
            <ModelResult
                show={isShowResult}
                setShow={setShowResult}
                dataModel={dataModel}
                handleShowAnswer={handleShowAnswer}
            /> 
        </div>
        </>
    );
}

export default DetailQuiz;
