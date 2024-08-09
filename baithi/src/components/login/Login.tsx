import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import { DataType } from "../../type/DataType";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    let res: DataType = await postLogin(email, pass);
    if (res && res.EC === 0) {
      navigate("/");
      dispatch(updateUser(res));
    }
    if (res && res.EC !== 0) {
      alert("Nhập sai mật khẩu");
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
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="....."
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-login">
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
