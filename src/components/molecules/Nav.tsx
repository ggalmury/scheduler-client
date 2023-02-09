import { useEffect, useState } from "react";
import CalendarSvg from "../../common/svgs/CalendarSvg";
import HomeSvg from "../../common/svgs/HomeSvg";
import TaskSvg from "../../common/svgs/TaskSvg";
import { RouteName } from "../../common/utils/enums";

const Nav = () => {
  const [activeButton, setActiveButton] = useState<string>(RouteName.HOME);

  const goToHome = () => {
    setActiveButton(RouteName.HOME);
  };

  const goToCalendar = () => {
    setActiveButton(RouteName.CALENDAR);
  };

  const goToTimeline = () => {
    setActiveButton(RouteName.TASKS);
  };

  return (
    <div id="nav">
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
        <div className={`category ${activeButton === RouteName.TASKS ? "whiter" : "grayer"}`} onClick={goToTimeline}>
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
