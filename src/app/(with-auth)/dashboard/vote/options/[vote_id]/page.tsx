"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { ResWithData } from "@/types/response";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
	const { vote_id } = useParams();
	const [results, setResult] = useState<any>(null!);
	const fetcher = () => {
		return API.get(`/api/vote-options/${vote_id}`);
	};
	const { data, error, fetchData, loading } = useFetch<any, ResWithData>(
		fetcher
	);
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		if (!error && !loading && data) {
			setResult(data.data);
		}
	}, [loading, data]);

	console.log(data);
	return (
		<div className="p-12">
			<div className="">
				<h2 className="text-5xl">{results && results.title}</h2>
			</div>

			<div className="">
				<Table>
					{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Option</TableHead>
							<TableHead>No of Votes</TableHead>
						</TableRow>
					</TableHeader>
					{results && (
						<TableBody>
							{results.options.map((option: any) => (
								<TableRow key={option.uuid}>
									<TableCell className="font-medium">{option.text}</TableCell>
									<TableCell className="font-medium">{results.currentVotes.filter((v:any)=> v.voteOptionsId == option.uuid ).length}</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
					<TableFooter>
						{/* <TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className="text-right">$2,500.00</TableCell>
						</TableRow> */}
					</TableFooter>
				</Table>
			</div>
		</div>
	);
};
