"use client";
import { useUser } from "@/app/context/user-context";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  VoteLayoutSkeleton,
} from "@/components/skeleton/votes-skeleton";

function Page() {
  const { user } = useUser();
  return (
    <div className="my-10 max-w-[900px] mx-auto">
      <Tabs defaultValue="account">
        <div className="flex gap-5 justify-between items-center">
          <h3 className="text-3xl font-bold">Votes</h3>

          <TabsList>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="past">
          <VoteLayoutSkeleton count={4} />
        </TabsContent>
        <TabsContent value="upcoming">
          <VoteLayoutSkeleton count={4} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
