"use client";
import React, { useState } from "react";
import Input from "@/components/Input/input";
import Button from "@/components/Button";
import "../auth.css";
import { montserrat } from "@/app/fonts";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

function SignUp() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div className="content-main">
      <header className="content-header">
        <h1 className={`${montserrat.className} heading`}>Welcome Back !</h1>
        <p className="sub-heading">Sign in to your account.</p>
      </header>

      <form className="auth-form">
        <Input
          label={"Username"}
          placeholder={"Enter your username"}
          icon={<FaRegUser className="input-icon" />}
          setValue={setUsername}
          value={username}
        />

        <Input
          label={"Password"}
          placeholder={"Enter your password"}
          icon={<RiLockPasswordLine className="input-icon" />}
          setValue={setPassword}
          value={password}
        />
      </form>
    </div>
  );
}

export default SignUp;

// <div className="flex flex-col justify-left pt-40 pl-20">
//   <p className="font-bold text-2xl">Create Account</p>
//   <p className="font-light pt-2 text-lg">Create an account for your salesperson</p>

//   <form className="pt-5">
//     <Input label="Full Name" id="fullname" value={fullName} setValue={setFullName} />
//     <Input label="Phone Number"  id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} />
//     <Input label="Password" id="password1"  value={password1} setValue={setPassword1} />
//     <Input label="Password" id="password2" value={password2} setValue={setPassword2} />

//     <button>
//      {/* {label} */}
//       Sign Up
//     </button>
//   </form>
// </div>

{
  /* <section className="w-3/4">
</section> */
}
