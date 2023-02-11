import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarSvg from "../../common/svgs/CalendarSvg";
import HomeSvg from "../../common/svgs/HomeSvg";
import TaskSvg from "../../common/svgs/TaskSvg";
import { RouteName } from "../../common/utils/enums";
import { setClientEnv } from "../../config/envConfig";

const Nav = () => {
  const navigate = useNavigate();
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

  return (
    <div id="nav">
      <div id="title">
        <div id="title-name">Schedy</div>
      </div>
      <hr className="menu-hr"></hr>
      <div id="menu">
        <div className={`category ${activeButton === RouteName.HOME ? "whiter" : "grayer"}`} onClick={goToHome}>
          <div className="category-content">
            <HomeSvg></HomeSvg>
            <div>Home</div>
          </div>
        </div>
        <div className={`category ${activeButton === RouteName.CALENDAR ? "whiter" : "grayer"}`} onClick={goToCalendar}>
          <div className="category-content">
            <CalendarSvg></CalendarSvg>
            <div>Calendar</div>
          </div>
        </div>
        <div className={`category ${activeButton === RouteName.TASKS ? "whiter" : "grayer"}`} onClick={goToTasks}>
          <div className="category-content">
            <TaskSvg></TaskSvg>
            <div>Tasks</div>
          </div>
        </div>
      </div>
      <hr className="menu-hr"></hr>
    </div>
  );
};

export default Nav;
