import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import aatrox from "../../common/aatrox_circle.png";

const Header = () => {
  const userAccount = useSelector((state: RootState) => state.login.account);

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__greeting">
          <div className="header__greeting--hello">Hello, {userAccount.userName}!</div>
          <div className="header__greeting--how">How's everything going?</div>
        </div>
      </div>
      <div className="header__content">
        <div className="header__search">
          <input placeholder="Search your tasks"></input>
        </div>
        <div className="header__profile">
          <div className="header__profile--img">
            <img src={aatrox}></img>
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
