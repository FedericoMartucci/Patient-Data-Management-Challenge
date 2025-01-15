import React from "react";
import { type TypographyTypes } from "../typography.types";

const HelperText: React.FC<TypographyTypes> = ({ className, children }) => {
  return (
    <p
      className={`font-poppins mt-0 font-normal text-xs leading-[14.52px] ${className}`}
    >
      {children}
    </p>
  );
};

export default HelperText;
