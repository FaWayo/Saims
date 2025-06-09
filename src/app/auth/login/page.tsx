"use client";
import React, { useState } from "react";
import { montserrat } from "@/app/fonts";
import Link from "next/link";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="">
      <header className="r">
        <h1 className={`${montserrat.className}`}>Welcome Back !</h1>
        <p className="">Sign in to your account.</p>
      </header>

      <form className="">
        <div className="">
          <Input
            // label={"Username"}
            placeholder={"Enter your username"}
            // icon={<FaRegUser className="input-icon" />}
            // setValue={setUsername}
            value={username}
          />

          <Input
            // label={"Password"}
            placeholder={"Enter your password"}
            // icon={<RiLockPasswordLine className="input-icon" />}
            // setValue={setPassword}
            value={password}
          />
          <p className="reset-text">
            Forgotten Password? <span className="link-text">Reset</span>
          </p>
        </div>

        <Button title={"Sign In"} />

        <div>
          <p className="">
            Contact administrator to{" "}
            <Link className="auth-form-footer" href={"/auth/signup"}>
              <span className="link-text">Sign Up</span>
            </Link>{" "}
            if you don't have an account.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
