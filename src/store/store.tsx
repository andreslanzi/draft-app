import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StoreProps = {
	children: ReactNode;
};

export type Player = { nick: string; id: number };
export type Team = {
	members: Player[];
	name: string;
};

type StoreContextProps = {
	getPlayersQuantity: () => number;
	removePlayer: (id: number) => void;
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
};

const StoreContext = createContext({} as StoreContextProps);

export const useStore = () => {
	return useContext(StoreContext);
};

export const StoreProvider = ({ children }: StoreProps) => {
	const [players, setPlayers] = useLocalStorage<Player[]>("players", []);
	const [teams, setTeams] = useLocalStorage<Team[]>("teams", []);
	const [groupsQuantity, setGroupsQuantity] = useState<number>(0);
	const [teamsQuantity, setTeamsQuantity] = useState<number>(0);
	const [victoryPoints, setVictoryPoints] = useState<number>(3);

	const getPlayersQuantity = () => players.length;

	const removePlayer = (id: number) => {
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
				setVictoryPoints
				
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
