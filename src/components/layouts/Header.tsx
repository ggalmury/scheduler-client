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
      <div className="header__left">
        <div className="header__title">
          <div className="header__title--name">Schedy</div>
        </div>
        <div className="header__search">
          <InputTaskSearch placeholder="Search your tasks" value={searchedTask} onChange={setSearchedTask} onClick={resetSearchedTask} />
        </div>
      </div>
      <div className="header__right">
        <div className="header__profile">
          <div className="header__profile--img">
            <img src={userAccount.image} />
          </div>
          <div className="header__profile--hello">Hello, {userAccount.userName}!</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
