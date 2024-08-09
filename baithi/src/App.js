import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import About from "./papes/about/About";
import Admin from "./papes/admin/Admin";
import DashBoard from "./papes/admin/content/DashBoard";
import ManageUser from "./papes/admin/content/manageUser/ManageUser";
import ManageQuiz from "./papes/admin/content/quizz/ManageQuiz";
import ManageQuestion from "./papes/admin/content/question/ManageQuestion";
import Profile from "./papes/profile/Profile.tsx";
import ChangePass from "./papes/changePass/ChangePass";
import ListQuizzz from "./papes/user/ListQuizzz";
import DetailQuiz from "./papes/user/DetailQuiz";
import Ranking from "./papes/ranking/Ranking";
import HoemPage from "./components/home/HomePage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<HoemPage />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="resgister" element={<Register />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="ranking" element={<Ranking />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="changepass" element={<ChangePass/>}></Route>
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<DashBoard />}></Route>
            <Route path="manager" element={<ManageUser />}></Route>
            <Route path="manager-quizzer" element={<ManageQuiz />}></Route>
            <Route path="manager-questions" element={<ManageQuestion />}></Route>
          </Route>
          <Route path="/program" element={<ListQuizzz />}></Route>
          <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
