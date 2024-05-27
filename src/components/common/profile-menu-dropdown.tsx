"use client";
import { useUser } from "@/app/context/user-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Verify as VerifyIcon } from "iconsax-react";
import React, { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  const { user } = useUser();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-0">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-6 p-4  w-[250px]">
          <DropdownMenuLabel>
            <h4 className="text-[1rem]">
              {user?.firstName} {user?.lastName}
              <h5 className="text-sm capitalize font-thin flex gap-2 items-center">
                {user?.role}
                <div className="">
                  <VerifyIcon
                    size={18}
                    color={!user?.isVerified ? "green" : "#ffe001"}
                    variant="Bulk"
                  />
                </div>
              </h5>
            </h4>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help Center</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
