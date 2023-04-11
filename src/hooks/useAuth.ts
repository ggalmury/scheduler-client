import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login.status.isLoggedin);

  useEffect(() => {
    if (window.location.pathname !== "/" && window.location.pathname !== "/signup") {
      if (!isLoggedIn) {
        window.location.href = "/";
      }
    }
  }, [isLoggedIn]);
};

export default useAuth;
