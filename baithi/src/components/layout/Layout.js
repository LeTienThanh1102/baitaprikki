
import Navbar from "../Navbar/Navbar";
import Header from "../header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import HoemPage from "../home/HomePage";
import './Layout.scss';
import Information from "../infomation/Information";
import Footer from "../footer/Footer";
function Layout() {
    return ( 
        <div className="layout" style={{backgroundColor:"#1b1718"}}>
            <Header></Header>
            <div className="layout-body">
                <Navbar></Navbar>
                <div className="layout-content">
                    <HoemPage></HoemPage>
                    <Information></Information>
                </div>

            </div>
            <Footer></Footer>
        </div>
     );
}

export default Layout;