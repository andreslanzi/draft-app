import { useState } from "react";
import { useStore } from "../store/store";
import PlayerCard from "../components/PlayerCard";

type props = {
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const Step1 = ({ activeStep, setActiveStep }: props) => {
	const [textInput, setTextInput] = useState<string>("");
	const {
		players,
		setPlayers,
		setGroupsQuantity,
		clearAll,
		teamsQuantity,
		setTeamsQuantity,
		victoryPoints,
		setVictoryPoints,
		groupsQuantity,
		setInitialData,
	} = useStore();

	const createGroups = () => {
		let newPlayers: any = {};
		players.forEach((player) => {
			newPlayers[`${player.id}`] = {
				nick: player.nick,
				id: player.id,
			};
		});
		let newColumns: any = {};

		Array.from(Array(groupsQuantity + 1).keys()).forEach((group, idx) => {
			newColumns[`column-${group}`] = {
				id: `column-${group}`,
				title: idx === 0 ? "NO TEAM" : `TEAM ${group}`,
				playerIds:
					idx !== 0
						? []
						: Object.entries(newPlayers).map((player) => player[0]),
			};
		});

		const columnOrder = Array.from(Array(groupsQuantity + 1).keys()).map(
			(col) => `column-${col}`
		);
		setInitialData({
			players: newPlayers,
			columns: newColumns,
			columnOrder,
		});
	};

	return (
		<div className="flex flex-col">
			<div className="inline-flex w-full justify-around">
				<div className="flex flex-col w-[20%] items-center">
					<h2 className="font-bold text-center">Agregar Player</h2>
					<div className="relative h-11 w-full min-w-[200px]">
						<input
							onChange={(e) =>
								setTextInput(e.currentTarget.value)
							}
							value={textInput}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setPlayers([
										...players,
										{
											nick: textInput,
											id: `player-${String(
												Number(
													players.at(-1)?.id || 0
												) + 1
											)}`,
										},
									]);
									setTextInput("");
								}
							}}
							placeholder="Nick de player"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Nick
						</label>
					</div>

					<h2 className="font-bold text-center mt-10">
						Configuraciones
					</h2>
					<div className="relative h-11 w-full min-w-[200px] mb-5">
						<input
							onChange={(e) =>
								setGroupsQuantity(Number(e.currentTarget.value))
							}
							value={groupsQuantity}
							placeholder="Cantidad De Grupos"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Cantidad De Grupos
						</label>
					</div>
					<div className="relative h-11 w-full min-w-[200px] mb-5">
						<input
							onChange={(e) =>
								setTeamsQuantity(Number(e.currentTarget.value))
							}
							placeholder="Equipos por grupo"
							min={0}
							value={teamsQuantity}
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Equipos por grupo
						</label>
					</div>
					<div className="relative h-11 w-full min-w-[200px] mb-5">
						<input
							onChange={(e) =>
								setVictoryPoints(Number(e.currentTarget.value))
							}
							placeholder="Puntos por victoria"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
							min={0}
							defaultValue={victoryPoints}
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Puntos por victoria
						</label>
					</div>
					<p className="font-bold text-center mt-4">
						{" "}
						Cantidad de Equipos: {teamsQuantity}{" "}
					</p>
					<p className="font-bold text-center mt-4">
						{" "}
						Puntos por Victoria: {victoryPoints}{" "}
					</p>
				</div>

				<div className="flex flex-col w-[60%] flex-wrap max-h-[60%]">
					<div className="inline-flex items-center mb-5">
						<h2 className="font-bold text-center mr-2">
							Jugadores({players.length})
						</h2>
						<button
							className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-red-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
							type="button"
							onClick={() => clearAll()}
						>
							Borrar Todos
						</button>
					</div>

					<div className="inline-flex flex-wrap">
						{players.length > 0 &&
							players.map((player, idx) => (
								<PlayerCard
									player={player}
									key={idx}
									canDelete={true}
								/>
							))}
					</div>
				</div>
			</div>
			<div className="inline-flex justify-center items-center w-full mt-40">
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
		</div>
	);
};

export default Step1;
