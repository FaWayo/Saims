"use client";
import Input from "@/components/Input/input";
import React, { useState } from "react";
import { TbUserCog, TbLock } from "react-icons/tb";

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="mx-72">
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-headertext font-header text-2xl font-bold">Welcome Back!</p>
        <p className="text-normaltext pb-20">Sign in to your account.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Input label="Username" placeholder={"Enter your username"} id={""} icon={<TbUserCog />} value={userName} setValue={setUserName} />
        <Input label="Password" placeholder={"Enter your password"} id={""} icon={<TbLock />} value={password} setValue={setPassword} />
      </div>

      <button className="bg-mainblue">
        Sign in
      </button>


    </div>
  );
}

export default Login;
