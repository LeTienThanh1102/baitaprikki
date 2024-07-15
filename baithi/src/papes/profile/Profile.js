import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { putUpdateProfile, putUpdateUser } from "../../service/apiService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import './Profile.scss';
import Header from "../../components/header/Header";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [username, setUername] = useState('');
    const [anh, setAnh] = useState('');
    const [address, setAddress] = useState('');
    const [prevew, setreview] = useState('');
    const navigate = useNavigate();
    const [show, setShow]=useState(false);
    const dispatch=useDispatch();

    const account = useSelector((state) => state.user.account);
    const handleUploading = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setreview(URL.createObjectURL(e.target.files[0]));
            setAnh(e.target.files[0]);
        } else {
            // setreview('')
        }
    };

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUername(account.username);
            setAddress(account.address);
            setAnh('');
            if (account.image) {
                setreview(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);
    const handleUpdatePro = async () => {
        let res = await putUpdateProfile(username, anh);
        if (res && res.EC === 0) {
            setShow(false);
        } else {
            toast.error(res.EM);
        }
    };

  // EDIT
  const handleChange = (item) => {
    document
      .querySelector(`.setting__infor__item__button.${item.id}`)
      .classList.add("active");
    document.getElementById(item.id).disabled = false;
    document.getElementById(item.id).focus();
  };

  // CLOSE
  const handleClose = (item) => {
    document
      .querySelector(`.setting__infor__item__button.${item.id}`)
      .classList.remove("active");
    document.getElementById(item.id).disabled = true;
  };
  const setting = [
    {
      id: "username",
      field: "Họ tên",
      value: username,
      type: "text",
    },
    {
      id: "address",
      field: "Địa chỉ",
      value: address,
      type: "text",
    },
    {
      id: "email",
      field: "Email",
      value: email,
      type: "email",
    },
  ];

  // SETTING INPUT
  const handleChangeInput = (e,item) => {
    console.log(`Input changed for ${item.id}: ${e.target.value}`);
    if(item.id==="username"){
      setUername(e.target.value);
    }
    if(item.id==="email"){
      setEmail(e.target.value);
    }
    if(item.id==="address"){
      setAddress(e.target.value);
    }
  };

  const handleSave = async(item) => {
    const userUpdate= {
      username: username,
      address:address,
      email: email,
    }
    const data= await putUpdateUser(account.id,userUpdate);
    if(data){
      dispatch(putUpdateUser(data));
      toast.success("Update User Success !!!!");
      handleClose(item);
    }
  };
  return (
    <>
      <Header />
      <ToastContainer></ToastContainer>
      <section className="setting">
        <div className="setting__container">
          <h1>Cài Đặt</h1>
          <div className="setting__infor">
            <h2>Thông tin cá nhân</h2>
            {setting.map((item, index) => (
              <div key={index} className="setting__infor__item">
                <div className="setting__infor__item__input">
                  <h3>{item.field}</h3>
                  <input
                    id={item.id}
                    type={item.type}
                    defaultValue={item.value}
                    placeholder="Thêm thông tin"
                    onChange={(e) => handleChangeInput(e,item)}
                    disabled={true}
                  />
                </div>
                <div className={`setting__infor__item__button ${item.id}`}>
                  <button onClick={() => handleChange(item)}>Chỉnh sửa</button>
                  <div className="setting__infor__item__save">
                    <button onClick={() => handleSave(item)}>Lưu</button>
                    <button onClick={() => handleClose(item)}>Hủy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
