import { useState, useEffect, ChangeEvent } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { putUpdateProfile, putUpdateUser } from "../../service/apiService";
import { ToastContainer, toast } from "react-toastify";
import "./Profile.scss";
import { FiPlusCircle } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../../redux/store";
import { DataType } from "../../type/DataType";
interface SettingItem {
  id: string;
  field: string;
  value: string;
  type: string;
}
const Profile = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUername] = useState<string>("");
  const [image, setImage] = useState<File|string>("");
  const [address, setAddress] = useState<string>("");
  const [prevew, setreview] = useState<string>("");

  const account = useSelector((state:RootState) => state.user.account);

  useEffect(() => {
    if (account && account) {
      setEmail(account.email);
      setUername(account.username);
      setImage("");
      if (account.image) {
        setreview(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);
  const handleChangeUpload = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  //ok
  // EDIT
  const handleChange = (item:SettingItem) => {
    document.querySelector(`.setting__infor__item__button.${item.id}`)?.classList.add("active");
    const inputElement = document.getElementById(item.id) as HTMLInputElement;
    if (inputElement) {
      inputElement.disabled = false;
      inputElement.focus();
    }
  };

  // CLOSE
  const handleClose = (item:SettingItem) => {
    document
      .querySelector(`.setting__infor__item__button.${item.id}`)
      ?.classList.remove("active");
      const inputElement = document.getElementById(item.id) as HTMLInputElement;
      if (inputElement) {
        inputElement.disabled = true;
      }
  };
  const setting:SettingItem[] = [
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
  const handleChangeInput = (e:ChangeEvent<HTMLInputElement>, item:SettingItem) => {
    console.log(`Input changed for ${item.id}: ${e.target.value}`);
    if (item.id === "username") {
      setUername(e.target.value);
    }
    if (item.id === "email") {
      setEmail(e.target.value);
    }
    if (item.id === "address") {
      setAddress(e.target.value);
    }
  };

  const handleSave = async () => {
    let res:DataType = await putUpdateProfile(username, image);
    console.log(res);
        if (res && res.EC === 0) {
            toast.success("Update Profile Success");
        } else {
            toast.error(res.EM);
        }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <section className="setting">
        <div className="setting__container">
          <h1>Cài Đặt</h1>
          <div className="setting__infor">
            <div className="setting__infor__item">
              <div className="setting-avatar">
                <h3>Ảnh đại diện</h3>
                <div className="img-revieww">
                  {prevew ? (
                    <img src={prevew} className="profile-img" />
                  ) : (
                    <span> review imgae</span>
                  )}
                </div>
                <label className="lable-img" htmlFor="active">
                    <FiPlusCircle />
                    Upload File Image
                </label>
                <input type="file" id="active" hidden onChange={(e) => handleChangeUpload(e)}
                />
              </div>
            </div>
            <div className="profile-title">
              {setting.map((item, index) => (
                <div key={index} className="setting__infor__item">
                  <div className="setting-input">
                    <div className="setting__infor__item__input">
                      <h3>{item.field}</h3>
                      <input
                        id={item.id}
                        type={item.type}
                        defaultValue={item.value}
                        placeholder="Thêm thông tin"
                        onChange={(e) => handleChangeInput(e, item)}
                        disabled={true}
                      />
                    </div>
                    <div className={`setting__infor__item__button ${item.id}`}>
                      <button onClick={() => handleChange(item)}>Chỉnh sửa</button>
                      <div className="setting__infor__item__save">
                        <button onClick={() => handleSave()}>Lưu</button>
                        <button onClick={() => handleClose(item)}>Hủy</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
