import React, { ReactElement, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { setServerEnv } from "../../../config/envConfig";

const GoogleRedirect = (): ReactElement => {
  const location = useLocation();
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
    console.log(userData);
  };

  return <div>Google Redirect</div>;
};

export default GoogleRedirect;
