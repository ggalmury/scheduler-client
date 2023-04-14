import React, { ReactElement } from "react";

interface Props {
  width: number;
  fill: string;
  draw: ReactElement;
}

const Svg = ({ width, fill, draw }: Props): ReactElement => {
  return (
    <svg width={`${width}px`} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      {draw}
    </svg>
  );
};

export default Svg;
