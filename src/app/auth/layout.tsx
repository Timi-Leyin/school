import { ReactNode, Fragment } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export default Layout;
