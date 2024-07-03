import React,{useEffect} from 'react'
import './Navbar.scss'
import { useLocation,useNavigate,Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { AiFillSun } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineOpenAI } from "react-icons/ai";
const Navbar = () => {
  const navbar = [
    {
      Icon:IoHome,
      h4:"Home",
      path:'/'
    },
    {
      Icon:AiFillSun,
      h4:"Bài Thi",
      path:'/program'
    },
    {
      Icon:AiOutlineComment,
      h4:"Kết quả",
      path:'/result'
    },
    {
      Icon:AiOutlineOpenAI, 
      h4:"About me",
      path:'/about'
    },
  ]

  return (
    <div className="navbarr" style={{marginTop: "70px"}}>
        <div className="navbar__container">
          {navbar.map((item, index) =>(
            <Link 
              to={item.path} 
              key={index}
              className="navbar__icon "
              >
                <item.Icon style={{fontSize:"24px", color:"#ee9f7a"}} />
                <h4 className='navbar_title'>{item.h4}</h4>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default Navbar