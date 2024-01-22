"use client";
import Input from "@/components/Input";
import React, { useState } from "react";
import { TbUserCog, TbLock } from "react-icons/tb";

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="bg-white flex flex-col justify-center rounded-lg border-16 border-lightgray w-2/4 p-10 gap-4">
      <div className="font-header flex flex-col items-center justify-center gap-2">
        <p className="font-bold text-2xl">Welcome Back!</p>
        <p className="text-lg pb-6">Sign in to your account.</p>
      </div>

      <div>
        <Input
          id="userName"
          value={userName}
          setValue={setUserName}
          label="Username"
          icon={<TbUserCog className="h-12" strokeWidth="2" />}
          placeholder="Enter your username"
        />
      </div>

      <div>
        <Input
          id="password"
          value={password}
          setValue={setPassword}
          label="Password"
          icon={<TbLock className="h-12" strokeWidth="2" />}
          placeholder="Enter your password"
        />
      </div>
    </div>
  );
}

export default Login;
