import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { normalFail } from "../common/utils/alert";
import { RouteParam } from "../common/types/types/common";

const useAuth = () => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.account.status.isLoggedin);

  useEffect(() => {
    if (!isLoggedIn) {
      normalFail("Unauthenticate user!").then((res) => {
        window.location.href = RouteParam.signin;
      });
    }
  }, [isLoggedIn]);
};

export default useAuth;
