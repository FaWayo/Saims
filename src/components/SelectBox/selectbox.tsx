import React, { ReactNode } from "react";
import "../Input/input.css";
import Select, { SingleValue, StylesConfig } from "react-select";

interface Props {
  label: string;
  icon: ReactNode;
  placeholder: string;
  options: { label: string; value: string }[];
  value:
    | SingleValue<{
        label: string;
        value: string;
      }>
    | undefined;
  setValue: React.Dispatch<
    React.SetStateAction<
      | SingleValue<{
          label: string;
          value: string;
        }>
      | undefined
    >
  >;
}
const SelectBox = ({
  label,
  icon,
  placeholder,
  options,
  setValue,
  value,
}: Props) => {
  


  const customstyles: StylesConfig = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      border: "none",
      "&:hover": {
        border: "none"
      },
      
      "&:active": {
        border: "none"
      }
    })
  }

  return (
    <div className="input-cont">
      {icon}
      <div className="input-container">
        <label className="input-label">{label}</label>
        <div className="custom-select">
          <Select
            options={options}
            isClearable
            onChange={(value: any) => setValue(value)}
            value={value}
            placeholder={placeholder}
            styles={customstyles}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
