import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { Group, Match, useStore } from "../store/store";
import Column from "../components/Column";
import { alphabet } from "../lib/utils";

const TeamsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	align-items: flex-start;
	justify-content: center;
	justify-items: center;
`;
const LessContainer = styled.div`
	display: flex;
`;
const BoardContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Step2 = () => {
	const {
		boardData,
		activeStep,
		setActiveStep,
		setBoardData,
		groupsQuantity,
		teamsQuantity,
		setGroups,
		groups,
		activeGroup,
		setActiveGroup,
		players,
	} = useStore();

	const getColumns = () => {
		return boardData?.teamOrder
			.filter((col) => col !== "team-0")
			.map((columnId) => {
				const team = boardData.teams[columnId];
				const players = team.playerIds.map(
					(playerId) => boardData.players[playerId]
				);
				return <Column key={team.id} team={team} players={players} />;
			});
	};

	const getFirstColumn = () => {
		return boardData?.teamOrder
			.filter((col) => col === "team-0")
			.map((columnId) => {
				const team = boardData.teams[columnId];
				const players = team.playerIds.map(
					(playerId) => boardData.players[playerId]
				);
				return (
					<Column
						key={team.id}
						team={team}
						players={players}
						isNoTeamCol={true}
					/>
				);
			});
	};

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === "team-0" &&
			source.droppableId === "team-0"
		) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const start = boardData?.teams[source.droppableId];
		const finish = boardData?.teams[destination.droppableId];
		if (start && finish && start === finish) {
			const newPlayerIds = Array.from(start.playerIds);
			newPlayerIds.splice(source.index, 1);
			newPlayerIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				playerIds: newPlayerIds,
			};
			const newBoardData = {
				...boardData,
				teams: {
					...boardData?.teams,
					[newColumn.id]: newColumn,
				},
			};
			setBoardData(newBoardData);
			return;
		}

		//moving from one col to another
		const startPlayerIds = Array.from(start?.playerIds || []);
		startPlayerIds.splice(source.index, 1);
		const newStart = {
			...start,
			playerIds: startPlayerIds,
		};

		const finishPlayerIds = Array.from(finish?.playerIds || []);
		finishPlayerIds.splice(destination.index, 0, draggableId);
		const draggingPlayer = players.find((p) => p.id === draggableId);
		const isCaptain = draggingPlayer?.isCaptain || false;
		const newFinish = {
			...finish,
			playerIds: finishPlayerIds,
			tag: isCaptain ? `team ${draggingPlayer?.nick}` : `${finish?.tag}`,
		};
		const newBoardData = {
			...boardData,
			teams: {
				...boardData?.teams,
				[newStart.id as string]: newStart,
				[newFinish.id as string]: newFinish,
			},
		};
		setBoardData(newBoardData);
	};

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const getMatches = (teamIds: string[]) => {
		const matches: Match[] = [];
		teamIds.forEach((team, idx) => {
			const rivals = teamIds.filter((t) => teamIds.indexOf(t) > idx);
			rivals.forEach((rival) => {
				matches.push({
					id: `match-${team}vs${rival}`,
					teamIds: [team, rival],
					rounds: {
						[team]: 0,
						[rival]: 0,
					},
					winner: undefined,
				});
			});
		});
		return matches;
	};

	const createGroups = () => {
		let newGroups: Group[] = [];
		const shuffledTeams = shuffleArray(
			boardData?.teamOrder.filter((team) => team !== "team-0") || []
		);
		let lastTeamIdxUsed = 0;

		Array.from(Array(groupsQuantity).keys()).forEach((group, idx) => {
			const groupTeams = shuffledTeams.slice(
				lastTeamIdxUsed,
				lastTeamIdxUsed + teamsQuantity
			);
			const groupMatches = getMatches(groupTeams);
			newGroups.push({
				id: `group-${group}`,
				name: `Group ${alphabet[idx]}`,
				members: groupTeams,
				matches: groupMatches,
			});

			lastTeamIdxUsed = lastTeamIdxUsed + teamsQuantity;
		});
		setGroups(newGroups);
		setActiveGroup(newGroups[0].id);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<BoardContainer>
				<LessContainer>{getFirstColumn()}</LessContainer>
				<TeamsContainer>{getColumns()}</TeamsContainer>
			</BoardContainer>
			<div className="inline-flex justify-center items-center w-full my-10">
				<button
					className="w-[300px] h-10 mr-4 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-slate-100 text-cyan-300 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none "
					type="button"
					onClick={() => setActiveStep(activeStep - 1)}
				>
					Atrás
				</button>
				<button
					className="w-[300px] h-10  select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-cyan-300 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none  "
					type="button"
					onClick={async () => {
						createGroups();
						setActiveStep(activeStep + 1);
					}}
				>
					Continuar
				</button>
			</div>
		</DragDropContext>
	);
};

export default Step2;
