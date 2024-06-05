"use client";
import { useUser } from "@/app/context/user-context";
import Calendar from "@/components/common/calendar-view";
import Link from "next/link";
import React from "react";

function Page() {
  const { user } = useUser();
  return (
    <div className="grid p-12 gap-6 grid-cols-2">
      <div className="">
        <div className="">
          <h2 className="text-4xl font-semibold">Upcoming Elections</h2>
          <p className="text-sm py-1">Upcoming Elections and Voting info</p>
        </div>
        <div className="">
          <Calendar />
        </div>
      </div>
      <div className="">
        <div className="">
          <h2 className="text-4xl font-semibold">
            Recently Concluded Elections
          </h2>
          <p className="text-sm py-1">Upcoming Elections and Voting info</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
