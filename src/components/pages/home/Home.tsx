import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountStatus } from "../../../common/interfaces/store";
import { RootState } from "../../../store/rootReducer";
import TaskSumm from "./TaskSumm";

const Home = () => {
  const navigate = useNavigate();
  const userStatus: AccountStatus = useSelector((state: RootState) => state.login.status);

  useEffect(() => {
    if (!userStatus.isLoggedin) {
      navigate("/");
    }
  });

  return (
    <div id="article-upper">
      <TaskSumm></TaskSumm>
    </div>
  );
};

export default Home;
