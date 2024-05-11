import React from "react";
import Text from "../components/Text";
import logo_img from "../image/logo.svg";

const Logo = () => {
  const size = 60;
  return (
    <div className="flex gap-2 items-center justify-center z-50">
      <img height={size} width={size} alt="logo" src={logo_img} />
      <Text text="wgmi.exchange" />
    </div>
  );
};

export default Logo;
