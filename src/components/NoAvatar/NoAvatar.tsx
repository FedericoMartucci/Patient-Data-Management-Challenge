import React from "react";
import Body1 from "../../utils/typography/body1/body1";

export interface NoAvatarProps {
  text: string;
  className?: string;
  width?: number;
  height?: number;
}

const NoAvatar: React.FC<NoAvatarProps> = ({
  text,
  className,
  width = 32,
  height = 32
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`text-white font-bold text-4xl rounded-full bg-primary flex items-center justify-center text-primary-700 p-10 ${className}`}
    >
      {text
        .split(" ")
        .map((name, index, array) => {
          if (index === 0 || (index === array.length - 1 && array.length > 1)) {
            return name.charAt(0).toUpperCase();
          }
          return "";
        })
        .join("")}
    </div>
  );
};

export default NoAvatar;
