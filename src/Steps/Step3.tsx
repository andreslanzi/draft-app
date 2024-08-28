import { useStore } from "../store/store";
import GroupTable from "../groups/page";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/select";
import MatchCard from "../components/MatchCard";

const Step3 = () => {
	const { activeStep, setActiveStep, groups, setActiveGroup, activeGroup } =
		useStore();

	const handleGroupSelection = (selectedGroupId: string) => {
		if (selectedGroupId !== activeGroup) {
			setActiveGroup(selectedGroupId);
			return;
		}
	};

	const getGroupMatches = () => {
		const groupIdx = groups.findIndex((group) => group.id === activeGroup);
		const groupMatches = groups[groupIdx].matches;
		return groupMatches.map((match, idx) => (
			<MatchCard match={match} key={idx} />
		));
	};

	return (
		<>
			<div className="container mx-auto py-10">
				<h3 className="text-white mb-3">Groups</h3>
				<Select onValueChange={handleGroupSelection}>
					<SelectTrigger className="w-[180px] uppercase font-semi m-0">
						<SelectValue
							placeholder={
								groups.find((g) => g.id === activeGroup)
									?.name || ""
							}
						/>
					</SelectTrigger>
					<SelectContent>
						{groups.map((group, idx) => (
							<SelectItem
								value={group.id}
								className="uppercase font-semi"
								key={idx}
							>
								{group.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<GroupTable />
			<div className="grid min-[1660px]:grid-cols-3 min-[1150px]:grid-cols-2 grid-cols-1 gap-4 justify-center items-center justify-items-center">
				{getGroupMatches()}
			</div>
			<div className="inline-flex justify-center items-center w-full my-10">
				<button
					className="w-[300px] h-10 mr-4 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-100 text-cyan-300 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none "
					type="button"
					onClick={() => setActiveStep(activeStep - 1)}
				>
					Atrás
				</button>
				<button
					className="w-[300px] h-10  select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none  "
					type="button"
					onClick={async () => {
						setActiveStep(activeStep + 1);
					}}
				>
					Continuar
				</button>
			</div>
		</>
	);
};

export default Step3;
