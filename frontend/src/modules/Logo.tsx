import React from "react";
import Text from "../components/Text";
import logo_img from "../image/logo.svg";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center justify-center z-50">
      <img alt="logo" src={logo_img} className="w-[50px] md:w-[80px]" />
      <Text text="wgmi.exchange" className="text-sm md:text-lg md:font-semibold" />
    </div>
  );
};

export default Logo;
