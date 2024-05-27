import { ReactNode, Fragment } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="">
        <div className="grid grid-cols-2">
          <div className="bg-gray-100 h-screen animate-pulse"></div>
          <div className="">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
