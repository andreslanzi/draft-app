import React from "react";
import { Player, useStore } from "../../store/store";

type props = {
	player: Player;
	canDelete: boolean;
};

const PlayerCard = ({ player, canDelete }: props) => {
	const { removePlayer } = useStore();
	return (
		<button
			className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none
			 text-xs py-2 px-4 m-1 rounded-lg  text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			type="button"
			style={{
				backgroundColor: player.isCaptain ? "#088395" : "black",
			}}
		>
			{player.nick}
			{canDelete && (
				<i
					className="icon-remove ml-2 hover:text-red-500  text-red-400"
					onClick={() => removePlayer(player.id)}
				/>
			)}
		</button>
	);
};

export default PlayerCard;
