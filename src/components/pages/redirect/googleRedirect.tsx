import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { setServerEnv } from "../../../config/envConfig";
import { User } from "../../../common/types/interfaces/store";

const GoogleRedirect = (): ReactElement => {
  const location: Location = useLocation();

  const params: URLSearchParams = new URLSearchParams(location.search);

  const code: string = useMemo((): string => {
    const code: string | null = params.get("code");
    return code!;
  }, []);

  useEffect(() => {
    fetchData()
      .then((res) => {
        window.opener.postMessage(res, "http://localhost:3000");
      })
      .finally(() => {
        window.close();
      });
  }, []);

  const fetchData = async (): Promise<User> => {
    const userDataRaw: AxiosResponse = await axios.post(`${setServerEnv()}/google/user`, { code });
    const userData: User = userDataRaw.data;

    return userData;
  };

  return <div></div>;
};

export default GoogleRedirect;
