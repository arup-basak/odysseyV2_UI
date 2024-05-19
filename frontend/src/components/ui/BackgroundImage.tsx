import React from "react";
import ColorCircle from "./ColorCircle";
import NoiseFilter from "./NoiseFilter";

interface Circle {
  color: string;
  style: string;
}

const color = {
  orange: "#E77B5F",
  green: "#7EF5D8",
  blue: "#3464D5",
};

const circles: Circle[] = [
  {
    color: color.orange,
    style: "bottom-0 left-6 w-[30rem] h-[30rem] hidden md:block md:bottom-0 md:left-12 md:w-[32rem] md:h-[32rem]",
  },
  {
    color: color.green,
    style: "bottom-0 right-0 w-[60rem] h-[60rem] md:bottom-0 md:right-0 md:w-[50rem] md:h-[50rem]",
  },
  {
    color: color.blue,
    style: "top-5 left-20 w-[40rem] h-[40rem] md:top-0 md:left-80 md:w-[32rem] md:h-[32rem]",
  },
  {
    color: color.orange,
    style: "top-0 left-0 w-[30rem] h-[30rem] md:top-0 md:left-0 md:w-[32rem] md:h-[32rem]",
  },
];

const BackgroundImage = () => {
  return (
    <div className="absolute h-screen w-screen filter blur-[100px] -z-10 overflow-hidden">
      <NoiseFilter />
      {/* <div
        className="absolute w-full h-full"
        style={{ filter: "url(#noiseFilter)" }}
      /> */}
      {circles.map((circle, index) => (
        <ColorCircle
          key={index}
          color={circle.color}
          className={circle.style}
        />
      ))}
    </div>
  );
};

export default BackgroundImage;
