import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import Main from "../pages/Main";
import DailyTask from "../pages/task/DailyTask";
import TaskList from "../pages/task/TaskList";
import WeeklyTask from "../pages/task/WeeklyTask";

const MainRouter = () => {
  useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/main/" element={<Main />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="task" element={<TaskList />}>
            <Route path="daily" element={<DailyTask />}></Route>
            <Route path="weekly" element={<WeeklyTask />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
