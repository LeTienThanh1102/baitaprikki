import axios from "../util/axiosCustomize";

const postRegister=(email,username, password)=>{
    return axios.post('api/v1/register',{email, username, password});
}
const postLogin=(email, password)=>{
    return axios.post('api/v1/login', {email, password});
}
const getDashBoard=()=>{
    return axios.get('api/v1/overview');
}
const putUpdateUser = (id, username, role, anh) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', anh);
    return axios.put('api/v1/participant', data);
};
const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const getAllUser = () => {
    return axios.get('api/v1/participant/all');
};

const DeleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
};
const postCreatUser = (email, pass, username, role, anh) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', pass);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', anh);
    return axios.post('api/v1/participant', data);
};
const getAllDataQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all');
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
};
const putUpdateQuizz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
};

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
};
const getQuizwithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
};
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id });
};

const putUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);
    return axios.post('api/v1/profile', data);
};

export {postRegister, postLogin,getDashBoard,putUpdateUser,getUserPaginate,getAllUser,DeleteUser,postCreatUser
    ,getAllDataQuizForAdmin,postCreateNewQuiz,putUpdateQuizz,deleteQuiz,getQuizwithQA,postUpsertQA,postAssignQuiz,
    postCreateNewQuestionForQuiz,postCreateNewAnswerForQuestion,putUpdateProfile
}