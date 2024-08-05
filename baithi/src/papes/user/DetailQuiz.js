import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../service/apiService';
import _ from 'lodash';
import './Detail.scss';
import Question from './Question';
import ModelResult from './ModelResult';
import RightContent from './RightContent';
function DetailQuiz() {
    const params = useParams();
    const quizid = params.id;
    const location = useLocation();

    const [dataquiz, setDataQuiz] = useState([]);
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
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    let questionDes,
                        image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDes = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    });
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDes, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

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

    const handleCheckBox = (answerId, questionId) => {
        let dataClone = _.cloneDeep(dataquiz);
        let question = dataClone.find((item) => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map((item) => {
                if (item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = b;
        }
        let index = dataClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataClone[index] = question;
            setDataQuiz(dataClone);
        }
    };

    const handleFinish = async () => {
        console.log('check data before submit', dataquiz);
        let payload = {
            quizId: quizid,
            answers: [],
        };
        let answers = [];
        if (dataquiz && dataquiz.length > 0) {
            dataquiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach((item) => {
                    if (item.isSelected === true) {
                        userAnswerId.push(item.id);
                    }
                });

                answers.push({ questionId: questionId, userAnswerId: userAnswerId });
            });

            payload.answers = answers;
            let res = await postSubmitQuiz(payload);
          
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModel({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setShowResult(true);
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataquiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(
                                        (item) => +item.id === +dataQuizClone[i].answers[j].id,
                                    );
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                // Nên return lỗi cụ thể nếu xác định được, tránh viết chung chung ntn.
                alert('Something Wrongs......');
            }
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
