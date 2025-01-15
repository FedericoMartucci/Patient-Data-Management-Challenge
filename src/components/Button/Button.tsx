import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Subtitle from "../../utils/typography/subtitle/subtitle";
import Icon from "../Icon/Icon";
import type * as icons from "../Icon/index.ts";
import config from "../../../tailwind.config";

const buttonVariants = cva(
  [
    "w-full rounded-xl p-4 gap-2 flex items-center justify-center cursor-pointer",
    "transition-all duration-300 ease-in-out focus:outline-none",
    "disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      size: {
        large: "h-[56px]",
        medium: "h-[42px]"
      },
      variant: {
        filled: ["bg-secondary hover:bg-secondary/85 text-extrawhite"],
        ghost: [
          "bg-transparent border border-black hover:bg-black hover:text-extrawhite text-black"
        ],
        outline: [
          "bg-transparent border border-primary hover:bg-primary hover:text-extrawhite",
          "text-primary"
        ],
        error: ["bg-error hover:bg-error/60 text-extrawhite"]
      }
    },
    defaultVariants: {
      size: "medium",
      variant: "filled"
    }
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  icon?: keyof typeof icons;
  disabled?: boolean;
  className?: string;
  left?: boolean;
  right?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  variant,
  icon,
  className = "",
  left = false,
  right = false,
  onClick,
  ...props
}) => {
  const buttonClass = buttonVariants({ ...props, variant });
  const colors: Record<string, string> = config.theme.extend.colors;
  let iconColor: string;

  if (disabled) {
    iconColor = colors.gray["400"];
  } else {
    switch (variant) {
      case "filled":
        iconColor = colors.black;
        break;
      case "outline":
        iconColor = colors.white;
        break;
      case "ghost":
        iconColor = colors.primary["400"];
        break;
      case "error":
        iconColor = colors.white;
        break;
      default:
        iconColor = colors.black;
    }
  }

  return (
    <button
      className={className + buttonClass + className}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {left && icon && <Icon name={icon} fillColor={iconColor} />}
      <Subtitle>{children}</Subtitle>
      {right && icon && <Icon name={icon} fillColor={iconColor} />}
    </button>
  );
};

export default Button;
