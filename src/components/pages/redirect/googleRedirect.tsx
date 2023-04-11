import React, { Dispatch, ReactElement, useEffect, useMemo } from "react";
import { Location, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { setServerEnv } from "../../../config/envConfig";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/loginSlice";

const GoogleRedirect = (): ReactElement => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const location: Location = useLocation();

  const params = new URLSearchParams(location.search);

  const code = useMemo((): string => {
    const code = params.get("code");
    return code!;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData: AxiosResponse = await axios.post(`${setServerEnv()}/google/user`, { code });
    dispatch(login(userData.data));
    window.location.href = "/main/home";
  };

  return <div></div>;
};

export default GoogleRedirect;
