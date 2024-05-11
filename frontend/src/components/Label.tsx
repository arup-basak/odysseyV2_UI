import React from "react";

type TextProps = React.HTMLAttributes<HTMLLabelElement>;

interface Props extends TextProps {
  label: string;
}

const Label = (props: Props) => {
  const { className, label: labelText, ...otherProps } = props;

  return (
    <label className={`text-label text-xs select-none text-white ${className}`} {...otherProps}>
      {labelText}
    </label>
  );
};

export default Label;
