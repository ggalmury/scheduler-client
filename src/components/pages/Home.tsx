import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import Header from "../molecules/Header";
import Nav from "../molecules/Nav";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector((state: RootState) => state.login.status);

  useEffect(() => {
    if (!userStatus.isLoggedin) {
      navigate("/");
    }
  });

  return (
    <Fragment>
      <Header></Header>
      <div id="main-content">
        <Nav></Nav>
        <div id="article"></div>
      </div>
    </Fragment>
  );
};

export default Home;
