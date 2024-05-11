import React from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const Image = React.memo(({ src, alt, className = "h-[20rem] w-[20rem]" }: Props) => {
  return (
    <div className={`overflow-hidden rounded-[1.5rem] relative ${className}`}>
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
});

export default Image;