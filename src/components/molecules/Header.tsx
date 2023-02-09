import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import aatrox from "../../common/aatrox_circle.png";

const Header = () => {
  const userAccount = useSelector((state: RootState) => state.login.account);

  return (
    <div id="header">
      <div className="header-content">
        <div id="title">
          <div id="title-name">Schedy</div>
        </div>
        <div id="welcome-user">
          <div id="welcome-user-1">Hello, {userAccount.userName}!</div>
          <div id="welcome-user-2">How's everything going?</div>
        </div>
      </div>
      <div className="header-content">
        <div id="search-content">
          <input placeholder="Search your tasks"></input>
        </div>
        <div id="profile-summ">
          <div id="profile-summ-img">
            <img src={aatrox}></img>
          </div>
          <div id="profile-summ-info">
            <div id="profile-summ-info-username">{userAccount.userName}</div>
            <div id="profile-summ-info-role">role</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
