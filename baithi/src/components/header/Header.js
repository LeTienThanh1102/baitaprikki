import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { BsSearchHeart } from "react-icons/bs";
function Header() {
  const navigate=useNavigate();
  const handleNavigateLogin=()=>{
    navigate('/login');
  }
  return (
    <div className="header">
      <div className="header_logo">
        <Link to="/" className="header_logo_text">
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
        <div className="header_user">
          <button className="btn-button " onClick={()=>handleNavigateLogin()}>Đăng nhập</button>
        </div>
        <div className="setting">Setting</div>
      </div>
    </div>
  );
}

export default Header;
