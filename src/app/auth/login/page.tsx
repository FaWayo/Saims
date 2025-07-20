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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <header className="text-center space-y-2">
          <h1
            className={`${montserrat.className} text-2xl sm:text-3xl font-bold text-gray-900`}
          >
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Sign in to your account.
          </p>
        </header>

        <form className="space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />

            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />

            <p className="text-right text-sm">
              <span className="text-gray-600">Forgotten Password? </span>
              <button
                type="button"
                className="text-vividskyblue hover:cursor-pointer hover:text-vividskyblue/90 font-bold focus:outline-none rounded"
              >
                Reset
              </button>
            </p>
          </div>

          <Button className="w-full py-3 text-base sm:text-lg font-medium">
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sign up{" "}
              <Link
                className="text-vividskyblue hover:cursor-pointer hover:text-vividskyblue/90 font-bold focus:outline-none rounded"
                href="/auth/signup"
              >
                here
              </Link>{" "}
              if you don't have an account.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
