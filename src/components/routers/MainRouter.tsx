import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import Main from "../pages/Main";
import TaskCreateModal from "../pages/task/TaskCreate";
import TaskList from "../pages/task/TaskList";

const MainRouter = () => {
  useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/main/" element={<Main />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="task" element={<TaskList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
