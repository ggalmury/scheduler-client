import React, { Dispatch, Fragment, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RouteName, RouteNameType, RouteParam } from "../../common/types/types/common";
import { setClientEnv } from "../../config/envConfig";
import { logout } from "../../store/slices/accountSlice";
import { AnyAction } from "@reduxjs/toolkit";
import BtnNavCategory from "../molecules/button/BtnNavCategory";
import Svg from "../shared/Svg";
import { groupDraw, homeDraw, logoutDraw, messageDraw, taskDraw } from "../../common/utils/svgSources";
import { capitalizeFirstLetter } from "../../common/utils/common";

interface NavState {
  activeButton: RouteNameType;
}

const Nav = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const initialValue: NavState = {
    activeButton: RouteName.home,
  };

  const [activeButton, setActiveButton] = useState<RouteNameType>(initialValue.activeButton);

  useEffect(() => {
    if (window.location.href === `${setClientEnv()}/${RouteParam.home}`) {
      setActiveButton(RouteName.home);
    } else if (window.location.href === `${setClientEnv()}/${RouteParam.dailyTask}` || `${setClientEnv()}/${RouteParam.weeklyTask}`) {
      setActiveButton(RouteName.task);
    }
  }, []);

  const goToHome = (): void => {
    setActiveButton(RouteName.home);
    navigate(RouteParam.home);
  };

  const goToDailyTasks = (): void => {
    setActiveButton(RouteName.task);
    navigate(RouteParam.dailyTask);
  };

  const goToWeeklyTasks = (): void => {
    setActiveButton(RouteName.task);
    navigate(RouteParam.weeklyTask);
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

  const taskSubCategory = (): ReactElement => {
    return (
      <Fragment>
        <div className="btn__category-sub--menu" onClick={goToDailyTasks}>
          {capitalizeFirstLetter(RouteName.daily)}
        </div>
        <div className="btn__category-sub--menu" onClick={goToWeeklyTasks}>
          {capitalizeFirstLetter(RouteName.weekly)}
        </div>
      </Fragment>
    );
  };

  return (
    <div className="nav">
      <div className="nav__menu">
        <div className="nav__title">
          <div className="nav__title--name">Schedy</div>
        </div>
        <BtnNavCategory title={RouteName.home} activeButton={activeButton} navigatePoint={goToHome} svg={<Svg width={24} draw={homeDraw} />} />
        <BtnNavCategory title={RouteName.task} activeButton={activeButton} svg={<Svg width={24} draw={taskDraw} />} subCategory={taskSubCategory} />
        <BtnNavCategory title={RouteName.group} activeButton={activeButton} navigatePoint={goToGroup} svg={<Svg width={24} draw={groupDraw} />} />
        <BtnNavCategory title={RouteName.message} activeButton={activeButton} navigatePoint={goToMessage} svg={<Svg width={24} draw={messageDraw} />} />
        <hr className="nav__hr" />
      </div>
      <div className="nav__logout" onClick={logOut}>
        <BtnNavCategory title="Logout" svg={<Svg width={24} draw={logoutDraw} />} />
      </div>
    </div>
  );
};

export default Nav;
