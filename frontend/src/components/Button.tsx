import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  const { className } = props;

  return (
    <button
      {...props}
      className={`p-2 px-4 bg-white text-black transition rounded flex items-center justify-center ${className}`}
    />
  );
};

export default Button;
