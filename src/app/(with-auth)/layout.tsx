import React, { ReactNode } from "react";
import { UserProvider } from "../context/user-context";
import Header from "@/components/layouts/header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <div className="px-6">
        <Header />
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </div>
    </UserProvider>
  );
}

export default Layout;
