import React, { CSSProperties } from "react";

interface Props {
  width?: number;
  height?: number;
  color: string;
  className?: string;
}

const ColorCircle = ({
  width = 50,
  height = width,
  color,
  className = "w-80 h-80",
}: Props) => {
  return (
    <div
      style={{
        borderRadius: 9999,
        backgroundColor: color,
        position: "absolute",
      }}
      className={className}
    ></div>
  );
};

export default ColorCircle;
