import React, { ReactElement, ReactNode } from "react";
import "./button.css"

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
    <button className="mainbutton" onClick={onClick} type={type ? type : "button"} value={value}>
        {icon && icon}
        {label}
    </button>
  );
};

export default Button;
