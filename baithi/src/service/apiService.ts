import axios from "../util/axiosCustomize";
const postRegister=(email:string,username:string, password:string)=>{
    return axios.post<any,any>('api/v1/register',{email, username, password});
}
const postLogin=(email:string, password:string)=>{
    return axios.post<any,any>('api/v1/login', {email, password});
}
const getDashBoard=()=>{
    return axios.get('api/v1/overview');
}
const putUpdateUser = (id:string, username:string, role:string, anh:string) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', anh);
    return axios.put('api/v1/participant', data);
};
const getUserPaginate = (page:any, limit:any) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const getAllUser = () => {
    return axios.get('api/v1/participant/all');
};

const DeleteUser = (userId:string) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
};
const postCreatUser = (email:string, pass:string, username:string, role:string, anh:any) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', pass);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', anh);
    return axios.post('api/v1/participant', data);
};
const getAllDataQuizForAdmin = () => {
    return axios.get<any, any>('api/v1/quiz/all');
};

const postCreateNewQuiz = (description:string, name:string, difficulty:string, quizImage:any) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
};
const putUpdateQuizz = (id:string, description:string, name:string, difficulty:string, quizImage:any) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
};

const deleteQuiz = (id:string) => {
    return axios.delete(`api/v1/quiz/${id}`);
};
const getQuizwithQA = (quizId:string) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data:{}) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const postAssignQuiz = (quizId:string, userId:string) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
};

const postCreateNewQuestionForQuiz = (quiz_id:string, description:string, questionImage:any) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
};
const postCreateNewAnswerForQuestion = (description:string, correct_answer:boolean, question_id:string) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id });
};

const putUpdateProfile = (username:string, userImage:any) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);
    return axios.post('api/v1/profile', data);
};
const changePassword = (current_password:string, new_password:string) => {
    return axios.post('api/v1/change-password', { current_password, new_password });
};

const getListQuizbyUser = () => {
    return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id:string) => {
    return axios.get<any, any>(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data:{}) => {
    return axios.post('api/v1/quiz-submit', { ...data });
};

export {postRegister, postLogin,getDashBoard,putUpdateUser,getUserPaginate,getAllUser,DeleteUser,postCreatUser
    ,getAllDataQuizForAdmin,postCreateNewQuiz,putUpdateQuizz,deleteQuiz,getQuizwithQA,postUpsertQA,postAssignQuiz,
    postCreateNewQuestionForQuiz,postCreateNewAnswerForQuestion,putUpdateProfile,changePassword,
    getListQuizbyUser,getDataQuiz, postSubmitQuiz
}