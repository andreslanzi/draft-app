import { Team, useStore } from "../store/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function GroupTable() {
	// const data = getData();

	const { activeGroup, groups, boardData } = useStore();
	const { teams } = boardData;

	const getActiveGroup = (): Team[] => {
		const groupIdx = groups.findIndex((group) => group.id === activeGroup);
		const groupCol = groups[groupIdx].members.map(
			(member) => teams[member]
		);
		return groupCol;
	};

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={getActiveGroup()} />
		</div>
	);
}
