import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../molecules/Header";
import Nav from "../molecules/Nav";

const Main = () => {
  return (
    <Fragment>
      <Nav></Nav>
      <div id="content">
        <Header></Header>
        <div id="article">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
