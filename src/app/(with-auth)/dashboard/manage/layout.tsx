import React, { ReactNode } from "react";

function layout({ children }: { children: Readonly<ReactNode> }) {
  return <div>{children}</div>;
}

export default layout;