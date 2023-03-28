import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import Main from "../pages/Main";
import TaskContent from "../pages/task/TaskContent";

const MainRouter = () => {
  useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/main/" element={<Main />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="task/:type" element={<TaskContent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
