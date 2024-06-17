import { VoteData } from "@/types/global";
import React from "react";
import { Badge } from "../ui/badge";
import { FingerprintIcon } from "lucide-react";

function VoteCard({ vote }: { vote: VoteData }) {
  const [day, month] = new Date(vote.startDate)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "long",
    })
    .split(",");
  const startTime = new Date(vote.startDate).toLocaleTimeString("en-US", {
    hour12: true,
  });
  return (
    <div className="flex my-5 gap-5 mx-auto justify-between">
      <div className="flex flex-col w-[100px]">
        <div className="text-lg font-bold">{month}</div>
        <div className="opacity-70">{day}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[15px] h-[15px] bg-gray-200 rounded-full"></div>
        <div className="h-[230px] border-dashed border-l rounded-full"></div>
      </div>
      <div className="flex md:w-[600px] justify-between gap-3 p-6  rounded-md h-[250px] bg-gray-100 ">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold">{startTime}</div>
          <div className="font-bold text-5xl">{vote.title}</div>
          <div className="flex items-center mt-1 gap-2">
            <div className="w-[25px] h-[25px] rounded-full bg-gray-300 animate-pulse"></div>

            <div className="font-bold text-xs opacity-50 capitalize">
              By {vote.createdBy.email.split("@")[0]}
            </div>
          </div>
         <div className="mt-auto">
           <div className="flex gap-1 cursor-pointer text-sm items-center font-bold">
           <FingerprintIcon />
            <span>Vote Now</span>
           </div>
         {/* <Badge
            aria-disabled
            variant={"secondary"}
            className="bg-green-700 font-bold text-white w-max text-xs"
          >
            Participated
          </Badge> */}
         </div>
        </div>

        <div style={{
            background:`url(${"/thumb.avif"})`,
            backgroundSize:"cover"
        }} className="w-2/5 rounded-md h-full bg-slate-300"></div>
      </div>
    </div>
  );
}

export default VoteCard;
