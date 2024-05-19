import React from "react";

const NoiseFilter: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 700 700"
    width="100vw"
    // height="100vh"
    opacity="1"
  >
    <defs>
      <filter
        id="nnnoise-filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="linearRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.2"
          numOctaves="4"
          seed="15"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence"
        />
        <feSpecularLighting
          surfaceScale="2"
          specularConstant="0.5"
          specularExponent="20"
          lightingColor="#fdfdfe"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="turbulence"
          result="specularLighting"
        >
          <feDistantLight azimuth="3" elevation="156" />
        </feSpecularLighting>
      </filter>
    </defs>
    <rect width="700" height="700" fill="#35a59600" />
    <rect width="700" height="700" fill="#fdfdfe" filter="url(#nnnoise-filter)" />
  </svg>
);

export default NoiseFilter;