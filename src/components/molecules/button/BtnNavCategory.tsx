import React, { ReactElement, useState } from "react";
import { RouteNameType } from "../../../common/types/types/common";
import { capitalizeFirstLetter } from "../../../common/utils/common";

interface Props {
  title: string;
  activeButton?: RouteNameType;
  navigatePoint?: () => void;
  svg?: ReactElement;
  subCategory?: () => ReactElement;
}

const BtnNavCategory = ({ title, activeButton, navigatePoint, svg, subCategory }: Props): ReactElement => {
  const [subCategoryStatus, setSubCategoryStatus] = useState<boolean>(false);

  const subCategoryOn = (): void => {
    setSubCategoryStatus(true);
  };

  const subCategoryOff = (): void => {
    setSubCategoryStatus(false);
  };

  return (
    <div className="btn__category" onMouseOver={subCategoryOn} onMouseLeave={subCategoryOff}>
      <div className={`btn__category-box btn__category-box--${activeButton === title.toLowerCase() ? "click" : "hover"}`} onClick={navigatePoint}>
        <div>{svg}</div>
        <span>{capitalizeFirstLetter(title)}</span>
      </div>
      {subCategory && <div className={`btn__category-sub ${subCategoryStatus ? "category-down" : "category-up"}`}>{subCategory()}</div>}
    </div>
  );
};

export default BtnNavCategory;
