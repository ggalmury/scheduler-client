import { Fragment, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "../molecules/Header";
import Nav from "../molecules/Nav";
import useAuth from "../../hooks/useAuth";

const Main = (): ReactElement => {
  useAuth();

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
