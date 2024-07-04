import axios from "../util/axiosCustomize";

const postRegister=(email,username, password)=>{
    return axios.post('api/v1/register',{email, username, password});
}
const postLogin=(email, password)=>{
    return axios.post('api/v1/login', {email, password});
}

export {postRegister, postLogin}