import { Match, useStore } from "../../store/store";

type props = {
	match: Match;
};
const MatchCard = ({ match }: props) => {
	const { teamIds, id, rounds } = match;
	const {
		boardData,
		groups,
		activeGroup,
		setGroups,
		setBoardData,
		victoryPoints,
	} = useStore();
	const { teams } = boardData;

	const roundsA = rounds[teamIds[0]];
	const roundsB = rounds[teamIds[1]];

	const handleRoundsChange = (teamId: string, rounds: number) => {
		const groupIdx = groups.findIndex((group) => group.id === activeGroup);
		const activeMatch = groups[groupIdx].matches.find(
			(match) => match.id === id
		);
		const activeMatchIdx = groups[groupIdx].matches.findIndex(
			(match) => match.id === id
		);
		const rivalId: string =
			activeMatch?.teamIds.filter((team) => team !== teamId)[0] || "";
		const rivalRounds = activeMatch?.rounds[rivalId] || 0;

		const isWinner =
			(rounds >= 13 || rivalRounds >= 13) && rounds > rivalRounds;
		const newMatch = {
			...activeMatch,
			rounds: {
				...activeMatch?.rounds,
				[teamId]: rounds,
			},
			winner: isWinner ? teamId : !isWinner ? rivalId : undefined,
		};
		const groupsCopy = [...groups];
		const newMatches = [...groups[groupIdx].matches];
		newMatches[activeMatchIdx] = newMatch as Match;
		const newGroup = { ...groups[groupIdx], matches: newMatches };
		groupsCopy[groupIdx] = newGroup;

		const newTeams = { ...boardData.teams };
		if (!newTeams[teamId].matchesPlayed.includes(activeMatch?.id!)) {
			newTeams[teamId].matchesPlayed = [
				...newTeams[teamId].matchesPlayed,
				activeMatch?.id || "",
			];
		}
		setGroups([...groupsCopy]);
		setBoardData({ ...boardData, teams: newTeams });
	};

	const handleRoundsUpdate = (teamId: string) => {
		const groupIdx = groups.find((group) =>
			group.members.includes(teamId)
		)?.id;
		const activeGroup = groups.find((group) => group.id === groupIdx);
		const newTeams = { ...boardData.teams };

		activeGroup?.members.forEach((teamId) => {
			let count: number = 0;

			activeGroup.matches
				.filter((match) => match.teamIds.includes(teamId))
				.forEach((match) => {
					count += match.rounds[teamId];
					count -=
						match.rounds[
							match.teamIds.filter((id) => id !== teamId)[0]
						];
				});
			newTeams[teamId].roundsDiff = count;
		});

		const activeMatch = activeGroup?.matches.find(
			(match) => match.id === id
		);
		const rivalId: string =
			activeMatch?.teamIds.filter((team) => team !== teamId)[0] || "";
		const rivalRounds = activeMatch?.rounds[rivalId] || 0;
		const isFinished = roundsA >= 13 || roundsB >= 13;
		const isWinner =
			isFinished &&
			activeMatch?.rounds[teamId]! >= 13 &&
			activeMatch?.rounds[teamId]! > rivalRounds;

		console.log({ isFinished });
		console.log({ isWinner });

		if (isWinner) {
			// sacamos de los lost el match id
			newTeams[teamId].lost = newTeams[teamId].lost.filter(
				(id) => id !== activeMatch?.id
			);

			// si no incluye el won, se lo agregamos
			if (!newTeams[teamId].won.includes(activeMatch?.id!)) {
				newTeams[teamId].won = [
					...newTeams[teamId].won,
					activeMatch?.id || "",
				];
			}

			// agregamos el lost al rival
			if (!newTeams[teamId].lost.includes(activeMatch?.id!)) {
				newTeams[rivalId].lost = [
					...newTeams[rivalId].lost,
					activeMatch?.id || "",
				];
			}

			// le sacamos el won al rival
			newTeams[rivalId].won = newTeams[rivalId].won.filter(
				(id) => id !== activeMatch?.id
			);
		} else if (isFinished && !isWinner) {
			// le sacamos el won
			newTeams[teamId].won = newTeams[teamId].won.filter(
				(id) => id !== activeMatch?.id
			);

			// le agregamos el lost si no lo incluye
			if (!newTeams[teamId].lost.includes(activeMatch?.id!)) {
				console.log("pushing lost");
				newTeams[teamId].lost = [
					...newTeams[teamId].lost,
					activeMatch?.id || "",
				];
			}

			// le agregamos el won al rival si no lo incluye
			if (!newTeams[rivalId].won.includes(activeMatch?.id!)) {
				newTeams[rivalId].won = [
					...newTeams[rivalId].won,
					activeMatch?.id || "",
				];
			}
			// le sacmaos el lost al rival
			newTeams[rivalId].lost.filter((id) => id !== activeMatch?.id);
		}
		newTeams[teamId].points = newTeams[teamId].won.length * victoryPoints;
		newTeams[rivalId].points = newTeams[rivalId].won.length * victoryPoints;

		setBoardData({ ...boardData, teams: newTeams });
	};

	return (
		<div className="min-w-[500px] max-w-[500px] inline-flex items-center justify-between p-4 bg-white border border-cyan-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
			<div className="flex flex-col items-center">
				<div className="inline-flex items-center justify-start">
					<input
						className="w-[40px] min-h-[40px] p-0 m-0 mb-0 text-center border border-cyan-400 rounded-lg mr-4"
						style={{ margin: "0px", marginRight: "8px" }}
						onChange={(e) =>
							handleRoundsChange(
								teamIds[0],
								Number(e.currentTarget.value)
							)
						}
						onBlur={() => handleRoundsUpdate(teamIds[0])}
						value={roundsA}
						type="number"
					/>{" "}
					<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
						{teams[teamIds[0]].tag}{" "}
					</h5>
				</div>
				<span
					className={
						roundsA === 0 && roundsB === 0
							? ""
							: roundsA - roundsB > 0
							? `text-green-500`
							: "text-red-500"
					}
				>{`(${roundsA - roundsB})`}</span>
			</div>

			<span className="text-xl font-bold text-cyan-400"> VS </span>
			<div className="flex flex-col items-center">
				<div className="inline-flex items-center justify-start">
					<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
						{teams[teamIds[1]].tag}{" "}
					</h5>
					<input
						className="w-[40px] min-h-[40px] p-0 m-0 mb-0 text-center border border-cyan-400 rounded-lg  ml-4"
						style={{ margin: "0px", marginLeft: "8px" }}
						onChange={(e) =>
							handleRoundsChange(
								teamIds[1],
								Number(e.currentTarget.value)
							)
						}
						onBlur={() => handleRoundsUpdate(teamIds[1])}
						value={roundsB}
						type="number"
					/>
				</div>
				<span
					className={
						roundsA === 0 && roundsB === 0
							? ""
							: roundsB - roundsA > 0
							? `text-green-500`
							: "text-red-500"
					}
				>{`(${roundsB - roundsA})`}</span>
			</div>
		</div>
	);
};

export default MatchCard;
