import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { FaPlus } from 'react-icons/fa';
import { LuImagePlus } from 'react-icons/lu';
import { RiDeleteBinLine } from 'react-icons/ri';
import { LuBadgePlus } from 'react-icons/lu';
import { BiMinus } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import _, { values } from 'lodash';
import { toast } from 'react-toastify';
import {
    getAllDataQuizForAdmin,
    getQuizwithQA,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postUpsertQA,
} from '../../../../service/apiService';
function QuizQA() {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(initQuestions);

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fecthQuizwithQA();
        }
    }, [selectedQuiz]);

    const fecthQuizwithQA = async () => {
        let res = await getQuizwithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`,
                        `Question-${q.id}.png`,
                        'imgae/png',
                    );
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    };

    const fetchQuiz = async () => {
        let res = await getAllDataQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `Đề ${item.id} - ${item.description}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };
    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newquestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newquestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter((item) => item.id !== id);
            setQuestions(questionClone);
        }
    };
    const handleAddRemoveAnswer = (type, anId, quesId) => {
        let questionClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionClone.findIndex((item) => item.id === quesId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }
        if (type === 'REMOVE') {
            let index = questionClone.findIndex((item) => item.id === quesId);
            questionClone[index].answers = questionClone[index].answers.filter((item) => item.id !== anId);
            setQuestions(questionClone);
        }
    };

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex((item) => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    };
    const handleOnchangeFile = (questionId, e) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionClone[index].imageFile = e.target.files[0];
            questionClone[index].imageName = e.target.files[0].name;
            setQuestions(questionClone);
        }
    };
    const handleAnswerQuestion = (type, anId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map((answer) => {
                if (answer.id === anId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setQuestions(questionClone);
        }
    };
    const handleSuUpdateQuestion = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz !!!');
            return;
        }
        let isValidQu = true;
        let indexQu = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQu = false;
                indexQu = i;
                break;
            }
        }
        if (isValidQu === false) {
            toast.error(`Not Empty Description For Question ${indexQu + 1}`);
            return;
        }

        let isValid = true;
        let indexQ = 0,
            indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValid = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValid === false) {
                break;
            }
        }
        if (isValid === false) {
            toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }

        let qclone = _.cloneDeep(questions);
        console.log('Clone', qclone);
        for (let i = 0; i < qclone.length; i++) {
            if (qclone[i].imageFile) {
                qclone[i].imageFile = await toBase64(qclone[i].imageFile);
            }
        }
        //loi khong update đc
        fecthQuizwithQA();
        let resss = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: qclone,
        });
        if (resss && resss.EC === 0) {
            toast.success(resss.EM);
            fecthQuizwithQA();
        }
    };
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    console.log('check', questions);
    // console.log("selected", selectedQuiz);
    return (
        <div className="question-container">
            <div className="question-add-new">
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
                <div className=" add-new-question"> Add Question:</div>

                {questions &&
                    questions.length > 0 &&
                    questions.map((item, index) => (
                        <div key={item.id} className="question-new mb-3">
                            <div className="question-content">
                                <div className=" description ">
                                    <label className="label-des">Question {index + 1}:</label>
                                    <textarea
                                        type="textare"
                                        className="text-des"
                                        placeholder="Nhập câu hỏi ở đây....."
                                        value={item.description}
                                        onChange={(e) => handleOnchange('QUESTION', item.id, e.target.value)}
                                    />
                                </div>
                                <div className="group-upload">
                                    <label className="lable-upload" htmlFor={`${item.id}`}>
                                        {' '}
                                        <LuImagePlus className="loadinggg" /> Upload Image
                                    </label>
                                    <input
                                        id={`${item.id}`}
                                        type={'file'}
                                        hidden
                                        onChange={(e) => handleOnchangeFile(item.id, e)}
                                    />
                                    <span className="text-img">
                                        {item.imageName ? item.imageName : '0 file is uploaded'}
                                    </span>
                                </div>
                                <div className="btn-add">
                                    <span className="add-new" onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                        <FaPlus className="btn-icon-add"></FaPlus>
                                    </span>
                                    {questions.length > 1 && (
                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}>
                                            <RiDeleteBinLine className="btn-icon-remove" />
                                        </span>
                                    )}
                                </div>
                            </div>
                            {item.answers &&
                                item.answers.length &&
                                item.answers.map((an, index) => (
                                    <div key={an.id} className="answer-content">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            checked={an.isCorrect}
                                            onChange={(e) =>
                                                handleAnswerQuestion('CHECKBOX', an.id, item.id, e.target.checked)
                                            }
                                        />
                                        <div className="answers-input">
                                            <input
                                                type="text"
                                                className="answers-text"
                                                placeholder="Nhập câu trả lời ở đây....."
                                                value={an.description}
                                                onChange={(e) =>
                                                    handleAnswerQuestion('INPUT', an.id, item.id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="btn-add">
                                            <span
                                                className="add-new"
                                                onClick={() => handleAddRemoveAnswer('ADD', '', item.id)}
                                            >
                                                <LuBadgePlus className="plus-anwser"></LuBadgePlus>
                                            </span>
                                            {item.answers.length > 1 && (
                                                <BiMinus
                                                    className="btn-an-remove"
                                                    onClick={() => handleAddRemoveAnswer('REMOVE', an.id, item.id)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
                {questions && questions.length > 0 && (
                    <div>
                        <button onClick={() => handleSuUpdateQuestion()} className="btn btn-warning">
                            {' '}
                            Save Question{' '}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizQA;
