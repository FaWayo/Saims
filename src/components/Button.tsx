import React, { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  type?: "submit" | "button";
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: ReactNode
}

const Button: React.FC<Props> = ({
  label,
  type = "button",
  value,
  onClick,
  icon
}) => {
  return (
    <button type={type} value={value} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};

export default Button;
