"use client";
import { useUser } from "@/app/context/user-context";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VoteLayoutSkeleton } from "@/components/skeleton/votes-skeleton";
import { useFetch } from "@/hooks/use-fetch";
import { API } from "@/config/api";
import { GetAllVotesResponse } from "@/types/response";
import VoteCard from "@/components/common/vote-card";

const fetchAll = () => {
  return API.get("/api/votes");
};
function Page() {
  const { user } = useUser();
  const {
    loading,
    data: allVotes,
    error,
    fetchData,
  } = useFetch<undefined, GetAllVotesResponse>(fetchAll);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-10 max-w-[900px] mx-auto">
      <Tabs defaultValue="upcoming">
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
          {loading ? (
            <VoteLayoutSkeleton count={4} />
          ) : (
            <div className="">
              {allVotes && !error ? (
                <div className="my-3">
                  {allVotes.data.map((vote) => {
                    return <VoteCard vote={vote} key={vote.uuid} />;
                  })}
                </div>
              ) : (
                <div className="">An Error Occurred</div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
