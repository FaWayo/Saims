"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FcSalesPerformance } from "react-icons/fc";
//create components for buttons and inputs

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <main className="flex h-screen">
      <section className="w-2/4 bg-powderblue flex flex-col justify-between pl-5 text-white">
        <div className="flex justify-start items-center mt-5">
          <FcSalesPerformance className="h-10 w-10 border-2 border-yellow-100" />
          <span className="font-bold font-header text-2xl pl-2 font-outline-2">
            RAFFBY
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl">Welcome Back!</h1>
          <p className="mt-5">
            Please login with your personal info to streamline your sales and
            optimize your inventory
          </p>

          <Button label="SIGN IN" />
        </div>

        <div></div>

      </section>

      <section className="w-3/4">
        {/* Content for the second section */}
      </section>
    </main>
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
