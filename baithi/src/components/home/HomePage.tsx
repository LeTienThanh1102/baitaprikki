// import { useSelector } from 'react-redux';
// import video from '../../assets/img/hero.mp4';
import { useSelector } from "react-redux";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import Information from "../infomation/Information";
function HoemPage() {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="homepage-container">
        {/* <video autoPlay loop muted>
                    <source src={video} type="video/ogg" />
                    Your browser does not support the video tag.
                </video> */}
        <img
          src="https://eduquiz.pt-corp.vn/wp-content/uploads/2024/03/giai-phau-1024x640.png"
          alt=""
          className="home-img"
        ></img>
        <div className="home_content">
          <div className="home_header">
            Welcome to our competency assessment{" "}
          </div>
          <div className="home_text">
            The paradigm of modern medicine has changed from therapy to
            precision medicine for prevention and prediction. <br></br>
            Solgent is providing products and services that allow molecular
            diagnostic test to check if infected or not.
          </div>
          <div className="home_send">
            {isAuthenticated === false ? (
              <div>
                <button
                  className="btn-click"
                  onClick={() => navigate("/")}
                >
                  {" "}
                  TEST NOW
                </button>{" "}
              </div>
            ) : (
              <button  className="btn-click" onClick={() => navigate("/user")}> Start Now</button>
            )}
          </div>
        </div>
      </div>
      <Information />
    </>
  );
}

export default HoemPage;
