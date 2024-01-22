import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center border-r-8">
         {children}
    </main>
  );
}

export default AuthLayout;
