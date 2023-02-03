import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
