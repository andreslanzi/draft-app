import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StoreProps = {
	children: ReactNode;
};

export type Player = { nick: string; id: string; isCaptain: boolean };
export type Team = {
	id: string;
	tag: string;
	playerIds: string[];
	matchesPlayed: string[];
	won: string[];
	lost: string[];
	roundsDiff: number;
	points: number;
};
export type Match = {
	id: string;
	teamIds: string[];
	rounds: {
		[key: string]: number;
	};
	winner: string | undefined;
};
export type Group = {
	id: string;
	name: string;
	members: string[];
	matches: Match[];
};
export type BoardData = {
	players: {
		[key: string]: Player;
	};
	teamOrder: string[];
	teams: {
		[key: string]: Team;
	};
};

type StoreContextProps = {
	getPlayersQuantity: () => number;
	removePlayer: (id: string) => void;
	players: Player[];
	setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
	setGroupsQuantity: React.Dispatch<React.SetStateAction<number>>;
	groupsQuantity: number;
	clearAll: () => void;
	setTeamsQuantity: React.Dispatch<React.SetStateAction<number>>;
	teamsQuantity: number;
	setVictoryPoints: React.Dispatch<React.SetStateAction<number>>;
	victoryPoints: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	activeStep: number;
	boardData: BoardData;
	setBoardData: React.Dispatch<any>;
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
	teams: Team[];
	setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
	activeGroup: string;
	setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
};

const StoreContext = createContext({} as StoreContextProps);

export const useStore = () => {
	return useContext(StoreContext);
};

export const StoreProvider = ({ children }: StoreProps) => {
	const [players, setPlayers] = useLocalStorage<Player[]>("players", []);
	const [groups, setGroups] = useLocalStorage<Group[]>("groups", []);
	const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
	const [groupsQuantity, setGroupsQuantity] = useState<number>(3);
	const [teamsQuantity, setTeamsQuantity] = useState<number>(4);
	const [victoryPoints, setVictoryPoints] = useState<number>(3);
	const [activeStep, setActiveStep] = useState(0);
	const [activeGroup, setActiveGroup] = useState<string>("");
	const [boardData, setBoardData] = useLocalStorage<BoardData>("board-data", {
		players: {},
		teamOrder: [],
		teams: {},
	});

	// console.log({ boardData });
	// console.log({ groups });

	const getPlayersQuantity = () => players.length;

	const removePlayer = (id: string) => {
		setPlayers((currItems) => {
			return currItems.filter((player) => player.id !== id);
		});
	};

	const clearAll = () => {
		return setPlayers([]);
	};

	return (
		<StoreContext.Provider
			value={{
				getPlayersQuantity,
				removePlayer,
				players,
				setPlayers,
				clearAll,
				groups,
				setGroups,
				groupsQuantity,
				setGroupsQuantity,
				teamsQuantity,
				setTeamsQuantity,
				victoryPoints,
				setVictoryPoints,
				boardData,
				setBoardData,
				activeStep,
				setActiveStep,
				activeGroup,
				setActiveGroup,
				teams,
				setTeams,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
