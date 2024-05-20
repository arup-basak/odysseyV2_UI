import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "./Image";
import { isMobile } from "react-device-detect";

interface ImageViewerProps {
  imageSrc: string;
  children: React.ReactNode;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageSrc, children }) => {
  const [isHovered, setIsHovered] = useState(isMobile);

  return (
    <div
      className="glass-morphism p-4 relative rounded-md"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <Image
        src={imageSrc}
        alt="cover"
        className={`transition rounded-lg h-40 w-40 ${
          isHovered ? "rounded-b-none" : " "
        }`}
      />
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-black bg-opacity-50 overflow-hidden"
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
};

export default ImageViewer;
