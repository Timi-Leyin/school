"use client";
import React from "react";
import { NavMenu } from "../common/nav-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getInitials from "@/utils/get-initials";
import { useUser } from "@/app/context/user-context";
import ProfileMenuDropdown from "../common/profile-menu-dropdown";
import { FaAngleDown, FaBell, FaSearch } from "react-icons/fa";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex border-b justify-between gap-3 p-6 items-center">
      <div className="flex gap-5 items-center">
        <img src="/next.svg" className="w-[100px]" alt="logo" />
        <NavMenu />
      </div>

      <div className="flex gap-4 items-center">
        <div className="h-10 px-3 cursor-pointer bg-gray-100 rounded-full flex items-center justify-around">
          <input
            type="text"
            placeholder="Search Anything ..."
            className="outline-0 text-sm bg-transparent px-3"
          />
          <FaSearch fontSize={"14px"} />
        </div>
        <div className="size-10 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center">
          <FaBell fontSize={"14px"} />
        </div>
        <div className="">
          <ProfileMenuDropdown>
            <div className="flex items-center gap-2">
              <Avatar className="select-none">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs">
                  {getInitials(user!)}
                </AvatarFallback>
              </Avatar>
              <FaAngleDown />
            </div>
          </ProfileMenuDropdown>
        </div>
      </div>
    </div>
  );
}

export default Header;
