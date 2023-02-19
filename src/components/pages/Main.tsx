import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { DateFormat } from "../../common/utils/enums";
import Header from "../molecules/Header";
import Nav from "../molecules/Nav";

const Main = () => {
  return (
    <Fragment>
      <Nav></Nav>
      <div className="content">
        <Header></Header>
        <div id="article">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
