import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div className="flex gap-4 select-none">
      <motion.div
        className="bg-white p-2 gap-2 rounded shadow flex border border-white hover:border-blue-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className={`${flexCenter} ${buttonHeightWidth} text-lg px-2 py-1 rounded hover:bg-gray-200`}
          onClick={() => handleChangeValue(1)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          +
        </motion.button>
        <motion.p
          className={`${buttonHeightWidth} ${flexCenter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.p>
        <motion.button
          className={`${flexCenter} ${buttonHeightWidth} text-lg px-2 py-1 rounded hover:bg-gray-200`}
          onClick={() => handleChangeValue(-1)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          -
        </motion.button>
      </motion.div>

      <motion.button
        className="w-full md:w-fit bg-white text-black rounded px-6 hover:bg-gray-200 border border-white hover:border-blue-500"
        onClick={() => onSubmit(value)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Mint
      </motion.button>
    </motion.div>
  );
};

export default CountButton;
