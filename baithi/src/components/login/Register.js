import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { postRegister } from "../../service/apiService";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
      alert("Error Format");
      return;
    }
    let res = await postRegister(email, username, password);
    if (res && res.EC === 0) {
      navigate("/");
    }
    if (res && res.EC !== 0) {
      alert("Nhập sai account. Hãy tạo lại tài khoản");
    }
  };
  return (
    <div className="register">
      <div
        className="login-back"
        onClick={() => {
          navigate("/");
        }}
      >
        <button className="btn-login-back"> Back-Home</button>
      </div>
      <div className="login-register">
        <button
          className="btn-login"
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          Login????
        </button>
      </div>
      <div className="register-table-register">
        <div className="register_contaniner">
          <div className="register-header">
            <p className="register_name active">Register</p>
            <h1 style={{ fontSize: "28px", color: "rgb(102, 36, 8)" }}>
              ĐĂNG KÍ MỘT TÀI KHOẢN MỚI
            </h1>
          </div>
          <div className="register__acc-content">
            <label className="lable-text">Email:</label>
            <input
              type="text"
              name="email"
              className="register__acc-input"
              placeholder="Tên đăng nhập hoặc Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="lable-text">Password:</label>
            <input
              type="password"
              name="pass"
              className="register__acc-input"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="lable-text">Username:</label>
            <input
              type="text"
              name="username"
              className="register__acc-input"
              placeholder="Nhập Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="register_btn" onClick={() => handleRegister()}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
