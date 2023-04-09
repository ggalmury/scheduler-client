import { Dispatch, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CalendarSvg, GroupSvg, HomeSvg, LogoutSvg, MessageSvg } from "../../common/svg";
import { RouteName } from "../../common/types/types/common";
import { setClientEnv } from "../../config/envConfig";
import { logout } from "../../store/slices/loginSlice";
import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const Nav = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const initialValue = {
    activeButton: RouteName.home as string,
    taskSubCategory: false as boolean,
  } as any;

  const [activeButton, setActiveButton] = useState<string>(initialValue.activeButton);
  const [taskSubCategory, setTaskSubCategory] = useState<boolean>(initialValue.taskSubCategory);

  useState(() => {
    if (window.location.href === `${setClientEnv()}/main/home`) {
      setActiveButton(RouteName.home);
    } else if (window.location.href === `${setClientEnv()}/main/task/daily` || `${setClientEnv()}/main/task/weekly`) {
      setActiveButton(RouteName.tasks);
    }
  });

  const goToHome = (): void => {
    setActiveButton(RouteName.home);
    navigate("home");
  };

  const goToDailyTasks = (): void => {
    setActiveButton(RouteName.tasks);
    navigate("task/daily");
  };

  const goToWeeklyTasks = (): void => {
    setActiveButton(RouteName.tasks);
    navigate("task/weekly");
  };

  const goToGroup = (): void => {
    setActiveButton(RouteName.group);
  };

  const goToMessage = (): void => {
    setActiveButton(RouteName.message);
  };

  const logOut = (): void => {
    dispatch(logout(null));
  };

  const googleOAuth2UrlTest = async () => {
    const url: AxiosResponse = await axios.get("http://localhost:3500/google/entry");
    console.log(url.data);
    window.open(url.data);
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
      <div className="nav__logout" onClick={googleOAuth2UrlTest}>
        <div className="nav__content">oAuth2 url test</div>
      </div>
    </div>
  );
};

export default Nav;
