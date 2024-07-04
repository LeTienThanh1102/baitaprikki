import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = async(e) => {
    e.preventDefault();
    let res=await postLogin(email, pass);
    console.log(res);
    if(res && res.EC===0){
      navigate('/');
      dispatch(updateUser(res))

    }
    if(res && res.EC!==0){
      alert('Nhập sai mật khẩu'); 
    }
  };
  return (
    <div className="login">
      <div
        className="login-back"
        onClick={() => {
          navigate("/");
        }}
      >
        <button className="btn-login-back"> Back-Home</button>
      </div>
      <div className="login-register">
        <span className="login-not">Don't have an account yet?</span>
        <button
          className="btn-loginn"
          onClick={() => {
            navigate("/resgister");
          }}
        >
          {" "}
          Sign up
        </button>
      </div>
      <div className="login__container">
        <div className="login-title">
          <h2>Login</h2>
          <h1 style={{ fontSize: "28px" }}>ĐĂNG NHẬP VÀO TRANG CHỦ</h1>
        </div>

        <div className="login__society">
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="....."
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-login btn">
              {" "}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
