import React from "react";

type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

interface Props extends TextProps {
  text: string | number;
}

const Text = (props: Props) => {
  const { className, text, ...otherProps } = props;

  return (
    <p className={`text-white ${className}`} {...otherProps}>
      {text}
    </p>
  );
};

export default Text;
