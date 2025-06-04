import React from "react";
import "./input.css"

interface Props {
  label: string;
  placeholder: string;
  id?: string;
  type?: string;
  icon: React.ReactNode;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: boolean;
  errorMessage?: string;

}

const Input = ({ label, placeholder, value, setValue, id, type, icon }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="input-cont">
      {icon}
      <div className="input-container">
        <label className="input-label">{label}</label>
        <input className="auth-input" placeholder={placeholder} value={value} id={id} type={type ? type : 'text'} onChange={handleChange}/>
      </div>
    </div>
  );
}

export default Input;
