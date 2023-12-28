"use client";
import React, { useState } from "react";
import Input from "@/components/Input";

//create components for buttons and inputs

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div className="flex flex-col justify-center items-center pt-40 pl-20">
      <h1 className="font-bold font-header">Create Account</h1>
      <p>Create an account for your salesperson</p>

      <form>
        <Input label="Full Name" id="fullname" value={fullName} setValue={setFullName} />
        <Input label="Phone Number"  id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} />
        <Input label="Password" id="password1"  value={password1} setValue={setPassword1} />
        <Input label="Password" id="password2" value={password2} setValue={setPassword2} />

        <button>
         {/* {label} */}
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
