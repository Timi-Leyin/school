import React from "react";

function VotesSkeleton() {
  return (
    <div className="flex md:w-[600px] justify-between gap-3 p-6  rounded-md h-[200px] bg-gray-200 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="w-[150px] h-[20px] rounded-md bg-gray-300 animate-pulse"></div>
        <div className="w-[150px] h-[20px] rounded-md bg-gray-300 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="w-[25px] h-[25px] rounded-full bg-gray-300 animate-pulse"></div>

          <div className="w-[115px] h-[20px] rounded-md bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      <div className="w-2/5 rounded-md h-full bg-slate-300 animate-pulse"></div>
    </div>
  );
}

export const VoteLayerSkeleton = () => {
  return (
    <div className="flex gap-5 mx-auto justify-between">
      <div className="flex flex-col gap-3">
        <div className="rounded-md h-[20px] w-[150px] bg-slate-200 animate-pulse"></div>
        <div className="rounded-md h-[20px] w-[100px] bg-slate-200 animate-pulse"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[15px] h-[15px] bg-gray-200 rounded-full"></div>
        <div className="h-[230px] border-dashed border-l rounded-full"></div>
      </div>
      <VotesSkeleton />
    </div>
  );
};

export const VoteLayoutSkeleton = ({ count = 3 }) => {
  return (
    <div className="my-4">
      {Array(count)
        .fill(0)
        .map((_, i) => {
          return <VoteLayerSkeleton key={i} />;
        })}
    </div>
  );
};

export default VotesSkeleton;
