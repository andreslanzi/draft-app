import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import initialData from "../data";

type StoreProps = {
	children: ReactNode;
};

export type Player = { nick: string; id: string };
export type Team = {
	members: Player[];
	name: string;
};

type StoreContextProps = {
	getPlayersQuantity: () => number;
	removePlayer: (id: string) => void;
	players: Player[];
	setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
	teams: Team[];
	setGroupsQuantity: React.Dispatch<React.SetStateAction<number>>;
	groupsQuantity: number;
	setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
	clearAll: () => void;
	setTeamsQuantity: React.Dispatch<React.SetStateAction<number>>;
	teamsQuantity: number;
	setVictoryPoints: React.Dispatch<React.SetStateAction<number>>;
	victoryPoints: number;
	initialData: any;
	setInitialData: React.Dispatch<any>;
};

console.log({ initialData });

const StoreContext = createContext({} as StoreContextProps);

export const useStore = () => {
	return useContext(StoreContext);
};

export const StoreProvider = ({ children }: StoreProps) => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [groupsQuantity, setGroupsQuantity] = useState<number>(0);
	const [teamsQuantity, setTeamsQuantity] = useState<number>(0);
	const [victoryPoints, setVictoryPoints] = useState<number>(3);
	const [initialData, setInitialData] = useState<any>(undefined);

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
				teams,
				setTeams,
				groupsQuantity,
				setGroupsQuantity,
				teamsQuantity,
				setTeamsQuantity,
				victoryPoints,
				setVictoryPoints,
				initialData,
				setInitialData,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
