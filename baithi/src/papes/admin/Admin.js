import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import SiderBar from "./SiderBar";
import './Admin.scss';
function Admin() {
  return (
    <div className="admin">
      <Header></Header>
      <div className="admin-container">
        <SiderBar ></SiderBar>
        <div className="admin-body">
            <Outlet></Outlet>
        </div>

      </div>
    </div>
  );
}

export default Admin;
