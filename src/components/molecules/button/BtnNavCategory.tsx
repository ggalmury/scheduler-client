import React, { ReactElement, useState } from "react";
import { RouteNameType } from "../../../common/types/types/common";
import { capitalizeFirstLetter } from "../../../common/utils/common";
import Svg from "../../shared/Svg";

interface Props {
  title: string;
  activeButton?: RouteNameType;
  navigatePoint?: () => void;
  draw: ReactElement;
  subCategory?: () => ReactElement;
  onClick?: () => void;
}

const BtnNavCategory = ({ title, activeButton, navigatePoint, draw, subCategory, onClick }: Props): ReactElement => {
  const [subCategoryStatus, setSubCategoryStatus] = useState<boolean>(false);

  const subCategoryOn = (): void => {
    setSubCategoryStatus(true);
  };

  const subCategoryOff = (): void => {
    setSubCategoryStatus(false);
  };

  return (
    <div className="btn__category" onMouseOver={subCategoryOn} onMouseLeave={subCategoryOff} onClick={onClick}>
      <div className={`btn__category-box btn__category-box--${activeButton === title.toLowerCase() ? "click" : "hover"}`} onClick={navigatePoint}>
        <div>
          <Svg width={15} draw={draw} />
        </div>
        <span>{capitalizeFirstLetter(title)}</span>
      </div>
      {subCategory && <div className={`btn__category-sub ${subCategoryStatus ? "category-down" : "category-up"}`}>{subCategory()}</div>}
    </div>
  );
};

export default BtnNavCategory;
