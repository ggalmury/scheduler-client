import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarSvg from "../../common/svgs/CalendarSvg";
import HomeSvg from "../../common/svgs/HomeSvg";
import LogoutSvg from "../../common/svgs/LogoutSvg";
import TaskSvg from "../../common/svgs/TaskSvg";
import { RouteName } from "../../common/utils/enums";
import { setClientEnv } from "../../config/envConfig";
import { logout } from "../../store/slices/loginSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState<string>(RouteName.HOME);

  useState(() => {
    if (window.location.href === `${setClientEnv()}/main/home`) {
      setActiveButton(RouteName.HOME);
    } else if (window.location.href === `${setClientEnv()}/main/task`) {
      setActiveButton(RouteName.TASKS);
    }
  });

  const goToHome = () => {
    setActiveButton(RouteName.HOME);
    navigate("home");
  };

  const goToCalendar = () => {
    setActiveButton(RouteName.CALENDAR);
  };

  const goToTasks = () => {
    setActiveButton(RouteName.TASKS);
    navigate("task");
  };

  const logOut = () => {
    dispatch(logout(null));
  };

  return (
    <div className="nav">
      <div className="nav__menu">
        <div className={`nav__category nav__category--${activeButton === RouteName.HOME ? "click" : "hover"}`} onClick={goToHome}>
          <div className="nav__content">
            <HomeSvg></HomeSvg>
          </div>
        </div>
        <div className={`nav__category nav__category--${activeButton === RouteName.CALENDAR ? "click" : "hover"}`} onClick={goToCalendar}>
          <div className="nav__content">
            <CalendarSvg></CalendarSvg>
          </div>
        </div>
        <div className={`nav__category nav__category--${activeButton === RouteName.TASKS ? "click" : "hover"}`} onClick={goToTasks}>
          <div className="nav__content">
            <TaskSvg></TaskSvg>
          </div>
        </div>
        <hr className="nav__hr" />
      </div>
      <div className="nav__logout" onClick={logOut}>
        <div className="nav__content">
          <LogoutSvg></LogoutSvg>
        </div>
      </div>
    </div>
  );
};

export default Nav;
