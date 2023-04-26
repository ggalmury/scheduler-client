import React, { ReactElement } from "react";
import useAuth from "../../../hooks/useAuth";

const Home = (): ReactElement => {
  useAuth();

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
