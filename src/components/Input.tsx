import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
  id: string;
  type?: string;
  //icon:
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Input({ label, placeholder, value, setValue, id, type }: Props) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type ? type : "text"}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        onChange={handleChange}
      />
      <br />
    </div>
  );
}

export default Input;
