"use client";
import { useUser } from "@/app/context/user-context";
import Link from "next/link";
import React from "react";

function Page() {
  const { user } = useUser();
  return (
    <div className="">
      <div>{user?.firstName}</div>
      <Link href={"/dashboard/profile"}>My Profile</Link>
    </div>
  );
}

export default Page;
