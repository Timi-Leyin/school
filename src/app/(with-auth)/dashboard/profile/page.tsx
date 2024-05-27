"use client";
import { useUser } from "@/app/context/user-context";
import Link from "next/link";
import React from "react";

function Page() {
  const user = useUser();
  return (
    <div className="">
      <div>{JSON.stringify(user)}</div>
      <Link href={"/dashboard"}>go back to Dashbaord</Link>
    </div>
  );
}

export default Page;
