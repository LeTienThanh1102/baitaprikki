import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { BsSearchHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../redux/authSlice";
function Header() {
  const dispatch=useDispatch();
  const isAuthencation=useSelector((state)=>state.user.isAuthenticated);
  const account=useSelector((state)=>state.user.account);
  const navigate=useNavigate();
  const edit=useRef();
  const handleNavigateLogin=()=>{
    navigate('/');
  }
  const handleCloseMenu=()=>{
    edit.current.classList.remove("active");
  }
  const handleLogout=()=>{
    navigate('/');
    dispatch(logout());
  }
  const handleClick = () => {
    edit.current.classList.toggle("active");
  };
  return (
    <div className="header">
      <div className="header_logo">
        <Link to="/home" className="header_logo_text">
          <h2 className="header_name" >TIENTHANH</h2>
        </Link>
      </div>
      <div className="header_body">
        <div id="search" className="header__body__search">
          <div className="search">
          <BsSearchHeart className="search_icon"/>
          </div>
          <input
            className="header_search"
            type="text"
            placeholder="Bạn đang tìm kiếm điều gì   "
          />
        </div>
      </div>
      <div className="header_footer">
        {isAuthencation===false ?
        <div className="header_user">
          <button className="btn-button " onClick={()=>handleNavigateLogin()}>Đăng nhập</button>
        </div> :
        <div className="header_user">
          <div ref={edit} className="header_user_name " onClick={()=>handleClick()}>
            <FaUserCircle style={{fontSize:"24px", marginRight:"5px"}}></FaUserCircle>
            {account?.username}
          </div>
          <div ref={edit} className="header__account__edit" >
                <div className="header__account__body">
                  <ul>
                    <li onClick={handleCloseMenu}>
                      <IoHomeOutline className="heeader-acc-icon" />
                      <Link className="header-acc-link" to="/home">Trang chủ</Link>
                    </li>
                    <li onClick={handleCloseMenu}>
                      <IoSettingsOutline className="heeader-acc-icon"/>
                      <Link className="header-acc-link" to="/profile"> Xem trang cá nhân</Link>
                    </li>
                    <li onClick={handleCloseMenu}>
                      <IoSettingsOutline className="heeader-acc-icon"/>
                      <Link className="header-acc-link" to="/changepass"> Change Password</Link>
                    </li>
                    <li onClick={handleCloseMenu}>
                      <MdOutlineLogout className="heeader-acc-icon" />
                      <Link className="header-acc-link" to='/' onClick={handleLogout}>
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Header;
