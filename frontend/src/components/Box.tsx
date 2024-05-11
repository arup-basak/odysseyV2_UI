import React from "react";

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

const Box: React.FC<BoxProps> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <div className={`w-max ${className}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Box;
