import React, { CSSProperties, ReactElement } from "react";

interface Props {
  width: number;
  fill?: string;
  draw: ReactElement;
  style?: CSSProperties;
}

const Svg = ({ width, fill, draw, style }: Props): ReactElement => {
  return (
    <svg width={`${width}px`} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" style={style}>
      {draw}
    </svg>
  );
};

export default Svg;
