import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import Main from "../pages/Main";
import TaskContent from "../pages/task/TaskContent";
import { ReactElement } from "react";
import GoogleRedirect from "../pages/redirect/googleRedirect";
import { RouteParam } from "../../common/types/types/common";

const MainRouter = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteParam.signin} element={<Login />} />
        <Route path={RouteParam.index} element={<Main />}>
          <Route path={RouteParam.home} element={<Home />} />
          <Route path="task/:type" element={<TaskContent />} />
        </Route>
        <Route path="google/redirect" element={<GoogleRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
