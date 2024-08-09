
import Navbar from "../Navbar/Navbar";
import Header from "../header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.scss';
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
function Layout() {
    return ( 
        <div className="layout" style={{backgroundColor:"#1b1718"}}>
            <Header />
            <div className="layout-body">
                <Navbar />
                <div className="layout-content">
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}

export default Layout;