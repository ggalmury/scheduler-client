import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CalendarType } from "../../../common/utils/enums";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskSumm from "./TaskSumm";

const Home = () => {
  const navigate = useNavigate();
  const userStatus = useSelector((state: RootState) => state.login.status);

  useEffect(() => {
    if (!userStatus.isLoggedin) {
      navigate("/");
    }
  });

  return (
    <div id="article-upper">
      <TaskSumm></TaskSumm>
      <Calendar size={CalendarType.SMALL_CALENDAR}></Calendar>
    </div>
  );
};

export default Home;
