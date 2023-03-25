import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CalendarSvg, GroupSvg, HomeSvg, LogoutSvg, MessageSvg } from "../../common/svg";
import { RouteName } from "../../common/types/types/common";
import { setClientEnv } from "../../config/envConfig";
import { logout } from "../../store/slices/loginSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState<string>(RouteName.home);
  const [taskSubCategory, setTaskSubCategory] = useState<boolean>(false);

  useState(() => {
    if (window.location.href === `${setClientEnv()}/main/home`) {
      setActiveButton(RouteName.home);
    } else if (window.location.href === `${setClientEnv()}/main/task`) {
      setActiveButton(RouteName.tasks);
    }
  });

  const goToHome = () => {
    setActiveButton(RouteName.home);
    navigate("home");
  };

  const goToDailyTasks = () => {
    setActiveButton(RouteName.tasks);
    navigate("task/daily");
  };

  const goToWeeklyTasks = () => {
    setActiveButton(RouteName.tasks);
    navigate("task/weekly");
  };

  const goToGroup = () => {
    setActiveButton(RouteName.group);
  };

  const goToMessage = () => {
    setActiveButton(RouteName.message);
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
          <div className={`nav__content nav__content--${activeButton === RouteName.home ? "click" : "hover"}`}>
            <HomeSvg></HomeSvg>
            <span>Home</span>
          </div>
        </div>
        <div
          className="nav__category"
          onMouseOver={() => {
            setTaskSubCategory(true);
          }}
          onMouseLeave={() => {
            setTaskSubCategory(false);
          }}
        >
          <div className={`nav__content nav__content--${activeButton === RouteName.tasks ? "click" : "hover"}`}>
            <CalendarSvg></CalendarSvg>
            <span>Tasks</span>
          </div>
          <div className={`nav__sub-category ${taskSubCategory ? "category-down" : "category-up"}`}>
            <div className="nav__sub-category--menu" onClick={goToDailyTasks}>
              daily
            </div>
            <div className="nav__sub-category--menu" onClick={goToWeeklyTasks}>
              weekly
            </div>
          </div>
        </div>
        <div className="nav__category" onClick={goToGroup}>
          <div className={`nav__content nav__content--${activeButton === RouteName.group ? "click" : "hover"}`}>
            <GroupSvg />
            <span>Group</span>
          </div>
        </div>
        <div className="nav__category" onClick={goToMessage}>
          <div className={`nav__content nav__content--${activeButton === RouteName.message ? "click" : "hover"}`}>
            <MessageSvg />
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
