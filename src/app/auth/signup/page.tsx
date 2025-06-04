"use client";
import Input from "@/components/Input/input";
import React, { useState } from "react";
import "../auth.css";
import { montserrat } from "@/app/fonts";
import { FaRegUser } from "react-icons/fa";
import Button from "@/components/Button/button";
import SelectBox from "@/components/SelectBox/selectbox";
import Select, { SingleValue } from "react-select";

function Signup() {
  const [role, setRole] = useState<SingleValue<{ label: string;  value: string; }>>();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div className="content-main">
      <header className="content-header">
        <h1 className={`${montserrat.className} heading`}>Welcome !</h1>
        <p className="sub-heading">
          Fill in the details to register an account.
        </p>
      </header>

      <form className="auth-form">
        <div className="inputs">
          {/* Component for dropdwown */}
          <div className="signup-inputs">
            <div style={{ width: "50%" }}>
               <SelectBox
                options={[
                  { label: "Accountant", value: "Accountant" },
                  { label: "Administrator", value: "Administrator" },
                  { label: "Salesperson", value: "Salesperson" },
                ]}
                placeholder="Select the user's role"
                label="User role"
                icon={<FaRegUser className="input-icon" />} 
                value={role} 
                setValue={setRole}              
                /> 
            </div>

            <div style={{ width: "50%" }}>
              <Input
                label={"Full Name"}
                placeholder={"Enter full name"}
                icon={<FaRegUser className="input-icon" />}
                setValue={setFullname}
                value={fullname}
              />
            </div>
          </div>

          <div className="signup-inputs">
            <div style={{ width: "50%" }}>
              <Input
                label={"User name"}
                placeholder={"Enter a valid username"}
                icon={<FaRegUser className="input-icon" />}
                setValue={setUsername}
                value={username}
              />
            </div>

            <div style={{ width: "50%" }}>
              <Input
                label={"Registration ID"}
                placeholder={"Enter a valid ID number"}
                icon={<FaRegUser className="input-icon" />}
                setValue={setRegisterId}
                value={registerId}
              />
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <Input
              label={"Phone Number"}
              placeholder={"Enter phone number"}
              icon={<FaRegUser className="input-icon" />}
              setValue={setPhonenumber}
              value={phonenumber}
            />
          </div>

          <div className="signup-inputs">
            <div style={{ width: "50%" }}>
              <Input
                label={"Password"}
                placeholder={"Set a password"}
                icon={<FaRegUser className="input-icon" />}
                setValue={setPassword}
                value={password}
              />
            </div>
            <div style={{ width: "50%" }}>
              <Input
                label={"Confirm password"}
                placeholder={"Re-enter password"}
                icon={<FaRegUser className="input-icon" />}
                setValue={setPassword2}
                value={password2}
              />
            </div>
          </div>
        </div>

        <div style={{ width: "50%", marginTop: "10px" }}>
          <Button label={"Create Account"} />
        </div>
      </form>
    </div>
  );
}

export default Signup;
