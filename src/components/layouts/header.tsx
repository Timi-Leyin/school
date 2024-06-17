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
    <div className="flex sticky top-0 left-0 w-full z-10 bg-white border-b justify-between gap-3 p-2 items-center">
      <div className="flex gap-5 items-center">
        <img src="/logo.svg" className="w-[40px]" alt="logo" />
        <NavMenu />
      </div>

      <div className="flex gap-4 items-center">
        <div className="h-8 px-3 cursor-pointer bg-gray-100 rounded-full flex items-center justify-around">
          <input
            type="text"
            placeholder="Search Anything ..."
            className="outline-0 text-xs bg-transparent px-3"
          />
          <FaSearch fontSize={"13px"} />
        </div>
        <div className="size-8 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center">
          <FaBell fontSize={"13px"} />
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
