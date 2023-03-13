import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountStatus } from "../../../common/types/interfaces/store";
import { RootState } from "../../../store/rootReducer";

const Home = () => {
  const navigate = useNavigate();
  const userStatus: AccountStatus = useSelector((state: RootState) => state.login.status);

  useEffect(() => {
    if (!userStatus.isLoggedin) {
      navigate("/");
    }
  });

  return (
    <div className="home-content">
      <div className="home-content__left">
        <div className="task-counter">
          <div className="task-counter__container">
            <div className="task-counter__header">
              <span>Task Count</span>
            </div>
            <div className="task-counter__content"></div>
          </div>
        </div>
        <div className="task-productivity"></div>
        <div className="task-summary"></div>
      </div>
      <div className="home-content__right"></div>
    </div>
  );
};

export default Home;
