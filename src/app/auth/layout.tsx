import React from "react";
import Logo from "@/components/Logo/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full p-5">
      <nav className="border-b border-lightgray">
        <Logo />
      </nav>

      <div className="">{children}</div>
    </main>
  );
};

export default AuthLayout;
