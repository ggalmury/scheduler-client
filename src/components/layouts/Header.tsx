import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { User } from "../../common/types/interfaces/store";
import { useInput } from "../../hooks/useInput";
import InputTaskSearch from "../molecules/input/InputTaskSearch";

const Header = (): ReactElement => {
  const userAccount: User = useSelector((state: RootState) => state.account.user);

  const [searchedTask, setSearchedTask, resetSearchedTask] = useInput<string>("");

  return (
    <div className="header">
      <div className="header__greeting">
        <div className="header__greeting--hello">Hello, {userAccount.userName}!</div>
        <div className="header__greeting--how">How's everything going?</div>
      </div>
      <div className="header__content">
        <div className="header__search">
          <InputTaskSearch placeholder="Search your tasks" value={searchedTask} onChange={setSearchedTask} onClick={resetSearchedTask} />
        </div>
        <div className="header__profile">
          <div className="header__profile--img">
            <img src={userAccount.image}></img>
          </div>
          <div className="header__user-detail">
            <div className="header__user-detail--username">{userAccount.userName}</div>
            <div className="header__user-detail--role">role</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
