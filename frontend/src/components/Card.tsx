import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={`shadow rounded-3xl flex flex-wrap z-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
