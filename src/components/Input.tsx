import React from "react";
import { PiEyeSlash } from "react-icons/pi";

interface Props {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: boolean;
  errorMessage?: string;
}

function Input({ label, placeholder, value, setValue, id, type, icon }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="border-2 border-lightgray rounded-lg p-1 flex justify-left items-center">
      <div className="pr-5 text-normaltext">{icon}</div>

      <div className="flex flex-col">
        <label htmlFor={id} className="text-normaltext">
          {label}
        </label>

        <input
          id={id}
          type={type ? type : "text"}
          placeholder={placeholder ? placeholder : ""}
          value={value}
          onChange={handleChange}
          //className="appearance-none border-none bg-transparent focus:outline-none"
          className="appearance-none border-none focus:outline-none"
        />
      </div>
      {id === "password" && (
        <div className="flex justify-end items-center order-last">
          <PiEyeSlash />
        </div>
      )}
    </div>
  );
}

export default Input;
