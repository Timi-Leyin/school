import { UsersTable } from "@/components/tables/users-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div className="py-4">
        <h2 className="text-4xl">Manage Users</h2>
        <p className="text-sm py-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis,
          explicabo.
        </p>
        <div className="flex mt-2 gap-4">
          <Link href={"/dashboard/manage/new"}>
          <Button className="flex items-center h-12 gap-3">
            Create New User <PlusCircle size={"16px"} />
          </Button></Link>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}

export default Page;
