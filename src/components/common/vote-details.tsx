import { useUser } from "@/app/context/user-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { VoteData } from "@/types/global";
import { GetVotesResponse } from "@/types/response";
import countVotes from "@/utils/count-votes";
import { getDay, getTime } from "@/utils/date";
import { Calendar, Copy } from "iconsax-react";
import { LinkIcon, TableIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
interface VoteDetailsProps {
	children: React.ReactNode;
	vote: VoteData;
}

interface CaseVoteProps {
	voteId: string;
	voteOptionId: string;
}

const fetcher = (data: CaseVoteProps) => {
	return API.post("/api/votes/cast", data);
};

export const VoteContent = ({
	vote,
	fetchData,
}: {
	vote: VoteData;
	fetchData: any;
}) => {
	const [day, month] = getDay(vote.startDate);
	const startTime = getTime(vote.startDate);
	const [endDay, endMonth] = getDay(vote.endDate);
	const endTime = getTime(vote.endDate);

	const { fetchData: castVote, loading } = useFetch<CaseVoteProps>(fetcher);
	const { user } = useUser();

	const started = new Date() >= new Date(vote.startDate);
	const ended = new Date() < new Date(vote.endDate);

	const stil = started && ended;
	const highest = countVotes(vote.currentVotes);

	useEffect(() => {}, []);

	return (
		<section>
			<div className="grid gap-4 py-4">
				{/* // eslint-disable-next-line @next/next/no-img-element */}
				<img src="/thumb.avif" />
				<div className="">
					<h3 className="font-bold text-xl">{vote.title}</h3>
				</div>

				<div className="flex gap-3 justify-between">
					<div className="">
						<p className="text-xs">
							{!stil ? "VOTE STARTS BY:" : "VOTE ENDS BY:"}{" "}
						</p>
						<div className="flex gap-1 my-1 items-center">
							<Calendar />
							<div className="">
								<p className="font-bold">
									{!stil ? (
										<>
											{day}, {month}
										</>
									) : (
										<>
											{endDay}, {endMonth}
										</>
									)}
								</p>
								<p className="text-xs">{!stil ? startTime : endTime}</p>
							</div>
						</div>
					</div>
					<div className="">
						<div className="text-xs">Total Votes</div>
						<Button variant={"outline"} className="text-xs font-bold">
							{vote.currentVotes.length}
						</Button>
					</div>
				</div>

				<div className="my-3">
					<h4 className="font-bold">Cast your vote</h4>

					<div>
						{vote.options.map((voteOptions) => {
							if (voteOptions.uuid == highest) {
								return (
									<Button
										variant={"outline"}
										className="my-2 font-semibold text-sm"
										key={voteOptions.uuid}
									>
										{voteOptions.text} has the highest vote
									</Button>
								);
							}
						})}
					</div>

					{stil ? (
						<div className="flex flex-wrap gap-3 mt-3">
							{vote.options.map(($vote, index) => {
								const checkVoted = vote.currentVotes.filter(
									(current) =>
										current.userId == user?.uuid &&
										current.voteOptionsId == $vote.uuid
								);
								const iVoted = checkVoted.length > 0;
								console.log(iVoted, index);
								return (
									<Button
										disabled={loading || iVoted}
										onClick={async () => {
											if (loading || iVoted) {
												return;
											}
											await castVote({
												voteId: vote.uuid,
												voteOptionId: $vote.uuid,
											});
											fetchData();
										}}
										variant={iVoted ? "secondary" : "outline"}
										className="text-xs"
										key={index}
									>
										{loading ? (
											<FaSpinner className="animate-spin" />
										) : (
											$vote.text
										)}
									</Button>
								);
							})}
						</div>
					) : (
						<p className="text-xs font-semibold my-2">
							{!started && "Can't vote yet | Vote is yet to start"}
							{!ended && (
								<div>
									<span> Vote ended | can no longer cast your vote</span>
								</div>
							)}
						</p>
					)}
				</div>

				<div className="">
					<h4 className="font-bold">About Vote</h4>
					<p className="text-xs">{vote.description || "No description"}</p>
				</div>
			</div>
		</section>
	);
};

export function VoteDetails({ children, vote }: VoteDetailsProps) {
	const details = () => {
		return API.get(`/api/vote/${vote.uuid}`);
	};
	// ############################

	const {
		fetchData,
		loading: isLoadingDetails,
		data: voteDetail,
		error,
	} = useFetch<undefined, GetVotesResponse>(details);

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="!w-[400px] overflow-auto">
				<SheetHeader className="">
					<div className="flex gap-4 items-center">
						<Button variant={"outline"} className="flex items-center gap-4">
							<FaTimes size={12} />
						</Button>
						<Link
							href={`/dashboard/vote/options/${
								voteDetail && voteDetail.data && voteDetail.data.uuid
							}`}
						>
							<Button
								variant={"outline"}
								className="flex items-center gap-4 text-xs"
							>
								<TableIcon size={12} /> View Vote Listing
							</Button>
						</Link>
					</div>
				</SheetHeader>
				{isLoadingDetails ? (
					<Fragment>LOADING ...</Fragment>
				) : (
					voteDetail && (
						<VoteContent fetchData={fetchData} vote={voteDetail.data} />
					)
				)}

				<SheetFooter>
					{/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
