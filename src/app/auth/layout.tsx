import React from "react";
import Logo from "@/components/Logo/logo";
import "./auth.css";
import "@/app/globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-container">
      <nav className="navbar">
        <Logo />
        <hr className="line" />
      </nav>

      <div className="main-section">
        <div className="content-section">
          {children}
        </div>
      </div>

    </main>
  );
};

export default AuthLayout;
