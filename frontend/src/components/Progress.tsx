import React from "react";

interface Props {
  width: number;
}

const Progress = ({ width }: Props) => {
  return (
    <div className="w-full bg-white bg-opacity-10 border border-opacity-35 rounded-full">
      <div
        className="bg-white h-2.5 rounded-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default Progress;
