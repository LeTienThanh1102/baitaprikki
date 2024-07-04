import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import About from "./papes/about/About";
import Admin from "./components/admin/Admin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/resgister" element={<Register></Register>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/admin" element={<Admin></Admin>}>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
