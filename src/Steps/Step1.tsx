import { useState } from "react";
import { useStore } from "../store/store";
import PlayerCard from "../components/PlayerCard";

const Step1 = () => {
	const [captainText, setCaptainText] = useState<string>("");
	const [playerText, setPlayerText] = useState<string>("");
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
		setBoardData,
		activeStep,
		setActiveStep,
	} = useStore();

	const createTeams = () => {
		let newPlayers: any = {};
		players.forEach((player) => {
			newPlayers[`${player.id}`] = {
				...player,
			};
		});
		let newColumns: any = {};

		Array.from(Array(teamsQuantity * groupsQuantity + 1).keys()).forEach(
			(team, idx) => {
				newColumns[`team-${team}`] = {
					id: `team-${team}`,
					tag: idx === 0 ? "NO TEAM" : `TEAM ${team}`,
					playerIds:
						idx !== 0
							? []
							: Object.entries(newPlayers).map(
									(player) => player[0]
							  ),
					matchesPlayed: [],
					won: [],
					lost: [],
					roundsDiff: 0,
					points: 0,
				};
			}
		);

		const teamOrder = Array.from(
			Array(teamsQuantity * groupsQuantity + 1).keys()
		).map((col) => `team-${col}`);
		setBoardData({
			players: newPlayers,
			teams: newColumns,
			teamOrder,
		});
	};

	return (
		<div className="flex flex-col">
			<div className="inline-flex w-full justify-around">
				<div className="flex flex-col w-[20%] items-center">
					<h2 className="font-bold text-center text-[#EBF4F6]">
						Agregar Capitán
					</h2>
					<div className="relative h-11 w-full min-w-[200px]">
						<input
							onChange={(e) =>
								setCaptainText(e.currentTarget.value)
							}
							value={captainText}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !!captainText.length) {
									const lastPlayerId = Number(
										players.at(-1)?.id.split("-")[1]
									);
									setPlayers([
										...players,
										{
											nick: captainText,
											id:
												players.length > 0
													? `player-${
															lastPlayerId! + 1
													  }`
													: "player-1",
											isCaptain: true,
										},
									]);
									setCaptainText("");
								}
							}}
							placeholder="Nick de player"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#EBF4F6] outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="text-[#EBF4F6] after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Nick
						</label>
					</div>
					<h2 className=" text-[#EBF4F6] font-bold text-center mt-10">
						Agregar Player
					</h2>
					<div className="relative h-11 w-full min-w-[200px]">
						<input
							onChange={(e) =>
								setPlayerText(e.currentTarget.value)
							}
							value={playerText}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !!playerText.length) {
									const lastPlayerId = Number(
										players.at(-1)?.id.split("-")[1]
									);
									setPlayers([
										...players,
										{
											nick: playerText,
											id:
												players.length > 0
													? `player-${
															lastPlayerId! + 1
													  }`
													: "player-1",
											isCaptain: false,
										},
									]);
									setPlayerText("");
								}
							}}
							placeholder="Nick de player"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#EBF4F6] outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-[#EBF4F6] transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Nick
						</label>
					</div>

					<h2 className="font-bold text-center my-10 text-[#EBF4F6]">
						Configuraciones
					</h2>
					<div className="relative h-11 w-full min-w-[200px] mb-5">
						<input
							onChange={(e) =>
								setGroupsQuantity(Number(e.currentTarget.value))
							}
							value={groupsQuantity}
							placeholder="Cantidad De Grupos"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#EBF4F6] outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-[#EBF4F6] transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#EBF4F6] outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-[#EBF4F6] transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Equipos por grupo
						</label>
					</div>
					<div className="relative h-11 w-full min-w-[200px] mb-5">
						<input
							onChange={(e) =>
								setVictoryPoints(Number(e.currentTarget.value))
							}
							placeholder="Puntos por victoria"
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-[#EBF4F6] outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
							min={0}
							defaultValue={victoryPoints}
						/>

						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-[#EBF4F6] transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Puntos por victoria
						</label>
					</div>
					<p className="font-bold text-center mt-4 text-[#EBF4F6]">
						{" "}
						Cantidad de Equipos: {teamsQuantity}{" "}
					</p>
					<p className="font-bold text-center mt-4 text-[#EBF4F6]">
						{" "}
						Puntos por Victoria: {victoryPoints}{" "}
					</p>
				</div>

				<div className="flex flex-col w-[60%] flex-wrap max-h-[60%]">
					<div className="inline-flex items-center mb-5">
						<h2 className="font-bold text-center mr-2 text-[#EBF4F6]">
							Jugadores({players.length})
						</h2>
						<button
							className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-red-900 text-[#EBF4F6] shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
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
						createTeams();
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
