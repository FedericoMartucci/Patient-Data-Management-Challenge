import React from "react";
import { type TypographyTypes } from "../typography.types";

const Body1: React.FC<TypographyTypes> = ({ className, children }) => {
  return (
    <p
      className={`font-poppins font-normal text-base leading-[17.6px] ${className}`}
    >
      {children}
    </p>
  );
};

export default Body1;
