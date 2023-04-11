import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { setServerEnv } from "../../../config/envConfig";
import { Account } from "../../../common/types/interfaces/store";

const GoogleRedirect = (): ReactElement => {
  const location: Location = useLocation();

  const params = new URLSearchParams(location.search);

  const [accountData, setAccountData] = useState<Account | null>(null);

  const code = useMemo((): string => {
    const code = params.get("code");
    return code!;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.opener.postMessage(accountData, "http://localhost:3000");
  }, [accountData]);

  const fetchData = async () => {
    const userData: AxiosResponse = await axios.post(`${setServerEnv()}/google/user`, { code });
    setAccountData(userData.data);
  };

  return <div>asdf</div>;
};

export default GoogleRedirect;
