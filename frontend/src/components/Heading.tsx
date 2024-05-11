import React from "react";

interface HeadingProps {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  text,
  level = "h1",
  className = "",
}) => {
  const sizeMap: Record<string, string> = {
    h1: "text-3xl md:text-4xl lg:text-4xl",
    h2: "text-2xl md:text-3xl lg:text-3xl",
    h3: "text-xl md:text-2xl lg:text-2xl",
    h4: "text-lg md:text-xl lg:text-xl",
    h5: "text-md md:text-lg lg:text-lg",
    h6: "text-sm md:text-md lg:text-md",
  };

  const textSizeClass = sizeMap[level] || sizeMap.h1;

  const Tag = level as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${textSizeClass} font-bold leading-tight h-fit text-white ${className}`}
    >
      {text}
    </Tag>
  );
};

export default Heading;
