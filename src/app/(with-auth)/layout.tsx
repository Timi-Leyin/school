import React, { ReactNode } from "react";
import { UserProvider } from "../context/user-context";

function Layout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

export default Layout;
