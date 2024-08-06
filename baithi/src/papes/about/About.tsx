import React from "react";
import "./About.scss";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/Navbar/Navbar";
// import * as Food from "../../assets/img/doanngo.png";
// import * as dienmay from "../../assets/img/dienmay.png";
// import * as chatApp from "../../assets/img/chatApp.png";
interface ProjectPro{
  name: string,
  tech: string,
  desc: string,
  image:any, 
  github:string,
  web: string
}
const About = () => {
  const navigate = useNavigate();
  const social = [
    {
      title: "Facebook",
      href: "https://www.facebook.com/tea.live.167/",
      color: "#ccc",
    },
    {
      title: "instagram",
      href: "https://www.instagram.com/tealive4/",
      color: "#ccc",
    },
    {
      title: "linkedin",
      href: "https://www.linkedin.com/in/tuy%C3%AAn-nguy%E1%BB%85n-v%C4%83n-47771b234/",
      color: "#ccc",
    },
    {
      title: "github",
      href: "https://github.com/tuyentopro123",
      color: "#ccc",
    },
    {
      title: "youtube",
      href: "https://www.facebook.com/tea.live.167/",
      color: "#ccc",
    },
    {
      title: "twitter",
      href: "https://www.facebook.com/tea.live.167/",
      color: "#ccc",
    },
  ];

  const categories = [
    {
      name: "Frontend",
      field: "program",
    },
    {
      name: "Backend",
      field: "program",
    },
    {
      name: "NodeJS",
      field: "program",
    },
    {
      name: "Game",
      field: "life",
    },
    {
      name: "Social",
      field: "life",
    },
    {
      name: "Sports",
      field: "life",
    },
  ];

  const project:ProjectPro[] = [
    {
      name: "Shoppeee Expresss",
      tech: "ReactJs, SCSS",
      desc: "Đây là sản phẩm đầu tiên mình làm nên mới có giao diện cơ bản, chưa có chức năng gì cả",
      image: '',
      github: "https://github.com/tuyentopro123/Hiking-concept-web-template",
      web: "https://hiking-concept-web-template.vercel.app/",
    },
    {
      name: "Điện máy xanh xanhhh",
      tech: "ReactJs, SCSS",
      desc: "Đây là template mình làm ra dựa theo trang chủ của Thế giới di động",
      image: 'dienmay',
      github: "https://github.com/LeTienThanh1102/SupperMarket",
      web: "https://letienthanh1102.github.io/SupperMarket/",
    },
    {
      name: "Food Good",
      tech: "ReactJS, SCSS, Firebase",
      desc: "Đây là sản phẩm mình làm hướng dẫn của Youtube channel. và có một số chức năng cơ bản",
      image: 'Food',
      web: "https://web-do-an-letienthanh1102.vercel.app/",
      github: "https://github.com/LeTienThanh1102/good_food",
    },
  ];
  return (
    <>
      <section className="about">
        <div className="about__banner"></div>
        <div className="about__container">
          <div className="about__info">
            <h1>Xin chào các bạn</h1>
            <div className="about__info__content">
              <p>
                Chào các bạn, Mình là Thành, hiện đang là sinh viên năm 4 D20 ở
                Học Viện Công nghệ Bưu Chính Viễn thông PTIT. Hiện tại Mình đang
                định hướng trở thành một web developer và Mình đang cố gắng từng
                ngày để đạt được mục tiêu của mình. Mình luôn cố gắng tự tìm
                hiểu các công nghệ mới thông qua việc đọc hiểu document và xem
                các Youtube channel về các công nghệ hay những phương pháp hiệu
                quả khi phát triển web.
              </p>
              <div className="about__info__image">
                <img src="" alt="" />
              </div>
              <p>
                Hiện tại chuyên môn chính của Mình là về mảng Front-end. Mình
                làm việc khá nhiều về ReactJS và Mình bắt đầu hiểu rõ về nó.
                Mình cũng tự học và sử dụng nhiều framework hỗ trợ khác như
                Tailwind CSS,Material UI,... Và về Back-end Mình cũng biết một
                chút cơ bản. Trang blog cá nhân này được Mình xây dựng theo
                NodeJS dựa trên Javascript
              </p>
              <p>
                Về trình độ Tiếng Anh của mình thì hiện mình vẫn đang tự học
                thêm tiếng anh và có thể đọc hiểu được tài liệu cơ bản.
              </p>
            </div>
            <div className="about__info__more">
              <p>Một số công nghê mình đã tự tìm hiểu:</p>
              <div>
                <span>HTML</span>
                <span>CSS(SCSS)</span>
                <span>JavaScript (ES6+)</span>
                <span>ReactJS</span>
                <span>NodeJS (basic)</span>
                <span>Postman</span>
                <span>MongoDB</span>
                <span>Typescript (basic)</span>
              </div>
            </div>
            <div className="about__info__project">
              <h1>Một vài sản phẩm nhỏ mình đã làm </h1>
              {project.map((item, index) => (
                <div key={index} className="about__info__project__item">
                  <h2>{`${index + 1}. ${item.name}`}</h2>
                  <p>{`- Công nghệ đã dùng: ${item.tech}`}</p>
                  <p>{`- ${item.desc}`}</p>
                  <img src={item.image} alt="" />
                  <form action="">
                    <label>- Link github: </label>
                    <a href={item.github} target="_blank">
                      {item.github}
                    </a>
                    <br />
                    <br />
                    <label>- Link trang: </label>
                    <a href={item.web} target="_blank">
                      {item.web}
                    </a>
                  </form>
                </div>
              ))}
            </div>
            <span>
              Cảm ơn mọi người đã ghé thăm trang web của mình.{" "}
              <a href="/">Về trang chủ</a>
            </span>
          </div>

          <div className="about__sidebar">
            <div className="about__personal">
              <div className="about__personal__banner"></div>
              <div className="about__personal__box">
                <div className="about__personal__content">
                  <div className="about__personal__content__title">
                    <h2>Lê Tiến Thành</h2>
                    <div className="about__personal__content__address">
                      Thanh Bình, Hà Đông, Hà Nội
                    </div>
                  </div>
                  <div className="about__personal__content__detail">
                    <p style={{color:"#ccc", fontSize:"16px"}}>
                      Xin chào, tên mình là Thành. Mình là một front-end
                      developer. Mình có khả năng tự tìm hiểu và phát triển ứng
                      web app bằng các công nghệ mới ngày nay như ReactJS,
                      NextJS. Mình đang cố gắng phát triển và định hướng trong
                      tương lai sẽ trở thành một fullstack developer{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about__more">
              <div className="about__more__category">
                <div className="about__sidebar__title">
                  <span style={{fontSize:"20px"}}>Categories</span>
                </div>
                <ul>
                  {categories.map((item, index) => (
                    <li key={index} id={item.name}>
                      <Link className="link-category" to={`/${item.field}?category=${item.name}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
