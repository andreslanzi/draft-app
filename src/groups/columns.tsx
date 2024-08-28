/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "react-tooltip";
import { Team, useStore } from "../store/store";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Team>[] = [
	{
		accessorKey: "tag",
		header: () => (
			<div className="px-2 text-center text-black font-bold uppercase">
				Team
			</div>
		),
		cell: ({ row }) => {
			const { players } = useStore();
			const name: string = row.renderValue("tag");
			const playersIds: string[] = row.original["playerIds"];
			const playerNicks: string[] = playersIds.map(
				(id) => players.find((player) => player.id === id)?.nick!
			);
			return (
				<>
					<div
						data-tooltip-id="my-tooltip"
						data-tooltip-content={playerNicks.join("-")}
						className="px-2 text-center font-semi uppercase"
					>
						{name}
					</div>
					<Tooltip id="my-tooltip" />
				</>
			);
		},
	},
	{
		accessorKey: "matchesPlayed",
		header: () => (
			<div className="px-2 text-center text-black font-bold uppercase">
				Matches
			</div>
		),
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const matchsPlayed = row.original.matchesPlayed.length;
			return <div className="px-2 text-center">{matchsPlayed}</div>;
		},
	},
	{
		accessorKey: "won",
		header: () => (
			<div className="px-2 text-center text-black font-bold uppercase">
				Won
			</div>
		),
		cell: ({ row }) => {
			const matchsWon = row.original.won.length;
			return <div className="px-2 text-center">{matchsWon}</div>;
		},
	},
	{
		accessorKey: "lost",
		header: () => (
			<div className="px-2 text-center text-black font-bold uppercase">
				Lost
			</div>
		),
		cell: ({ row }) => {
			const matchsLost = row.original.lost.length;
			return <div className="px-2 text-center">{matchsLost}</div>;
		},
	},
	{
		accessorKey: "roundsDiff",
		header: ({ column }) => {
			return (
				<div
					className="flex justify-center text-black font-bold uppercase items-center"
					// variant="ghost"
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === "asc",
							true
						)
					}
				>
					<div className="px-2 text-center hover:cursor-pointer">
						Rounds Difference
					</div>
					<ArrowUpDown className="h-4 w-4 hover:cursor-pointer" />
				</div>
			);
		},
		enableMultiSort: true,
		cell: ({ row }) => (
			<div className="px-2 text-center">{row.original.roundsDiff}</div>
		),
	},
	{
		accessorKey: "points",
		header: ({ column }) => {
			return (
				<div
					className="flex justify-center text-black font-bold uppercase items-center"
					// variant="ghost"
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === "asc",
							true
						)
					}
				>
					<div className="px-2 text-center hover:cursor-pointer">
						Points
					</div>
					<ArrowUpDown className="h-4 w-4 hover:cursor-pointer" />
				</div>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="px-2 text-center">{row.original.points}</div>
			);
		},
	},
];
