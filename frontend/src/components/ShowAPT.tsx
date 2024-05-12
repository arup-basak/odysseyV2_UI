import React from "react";
import Text from "./Text";
import Heading from "./Heading";

const ShowAPT = ({ value }: { value: string }) => {
  const formatAPT = (apt: number) => {
    return apt / 100000000;
  };
  return (
    <Heading
      text={`${formatAPT(parseInt(value))} APT`}
      className="text-xs md:text-base"
      level="h6"
    />
  );
};

export default ShowAPT;
