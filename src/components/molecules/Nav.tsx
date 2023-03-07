import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CalendarSvg, HomeSvg, LogoutSvg } from "../../common/svg";
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

  const goToTasks = () => {
    setActiveButton(RouteName.TASKS);
    navigate("task");
  };

  const goToGroup = () => {
    setActiveButton(RouteName.GROUP);
  };

  const goToMessage = () => {
    setActiveButton(RouteName.MESSAGE);
  };

  const logOut = () => {
    dispatch(logout(null));
  };

  return (
    <div className="nav">
      <div className="nav__menu">
        <div className="nav__title">
          <div className="nav__title--name">Schedy</div>
        </div>
        <div className="nav__category" onClick={goToHome}>
          <div className={`nav__content nav__content--${activeButton === RouteName.HOME ? "click" : "hover"}`}>
            <HomeSvg></HomeSvg>
            <span>Home</span>
          </div>
        </div>
        <div className="nav__category" onClick={goToTasks}>
          <div className={`nav__content nav__content--${activeButton === RouteName.TASKS ? "click" : "hover"}`}>
            <CalendarSvg></CalendarSvg>
            <span>Tasks</span>
          </div>
        </div>
        <div className="nav__category" onClick={goToGroup}>
          <div className={`nav__content nav__content--${activeButton === RouteName.GROUP ? "click" : "hover"}`}>
            <CalendarSvg></CalendarSvg>
            <span>Group</span>
          </div>
        </div>
        <div className="nav__category" onClick={goToMessage}>
          <div className={`nav__content nav__content--${activeButton === RouteName.MESSAGE ? "click" : "hover"}`}>
            <CalendarSvg></CalendarSvg>
            <span>Message</span>
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
