import React, { useState } from "react";

interface Props {
  maxLimit?: number;
  minLimit?: number;
  defaultValue?: number;
  onSubmit: (value: number) => void;
}

const CountButton = ({
  maxLimit = 999,
  minLimit = 0,
  defaultValue = 1,
  onSubmit,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = (increaseValue: number) => {
    const newValue = value + increaseValue;
    if (newValue > maxLimit) {
      setValue(maxLimit);
    } else if (newValue < minLimit) {
      setValue(minLimit);
    } else {
      setValue(newValue);
    }
  };

  const flexCenter = "flex items-center justify-center"
  const buttonHeightWidth = "h-8 w-8"

  return (
    <div className="flex gap-4 select-none">
      <div className="bg-white p-2 gap-2 rounded shadow flex">
        <button
          className={`${flexCenter} ${buttonHeightWidth} text-lg px-2 py-1 rounded hover:bg-gray-200 h-8 w-8`}
          onClick={() => handleChangeValue(1)}
        >
          +
        </button>
        <p className={`${buttonHeightWidth} ${flexCenter}`}>{value}</p>
        <button
          className={`${flexCenter} ${buttonHeightWidth} text-lg px-2 py-1 rounded hover:bg-gray-200`}
          onClick={() => handleChangeValue(-1)}
        >
          -
        </button>
      </div>

      <button
        className="w-full md:w-fit bg-white text-black rounded px-6 hover:bg-gray-200 "
        onClick={() => onSubmit(value)}
      >
        Mint
      </button>
    </div>
  );
};

export default CountButton;
