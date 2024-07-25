import React,{useEffect} from 'react'
import './Navbar.scss'
import { useLocation,useNavigate,Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { AiFillSun } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineOpenAI } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const Navbar: React.FC = () => {
  const account=useSelector((state :RootState)=>state.user.account);
  const navbar = [
    {
      Icon:IoHome,
      h4:"Home",
      path:'/home'
    },
    {
      Icon:AiFillSun,
      h4:"Bài Thi",
      path:'/program'
    },
    {
      Icon:AiOutlineComment,
      h4:"Kết quả",
      path:'/ranking'
    },
    {
      Icon:AiOutlineOpenAI, 
      h4:"About me",
      path:'/about'
    },
  ]
  const navbar2 = [
    {
      Icon:IoHome,
      h4:"Home",
      path:'/home'
    },
    {
      Icon:AiFillSun,
      h4:"Manager",
      path:'/admin'
    },
    {
      Icon:AiOutlineOpenAI, 
      h4:"About me",
      path:'/about'
    },
  ]

  return (
    <div className="navbarr" style={{marginTop: "70px"}}>
      {account.role==="ADMIN"?
      <div className="navbar__container">
          {navbar2.map((item, index) =>(
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
      :
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
      }
    </div>
  )
}

export default Navbar