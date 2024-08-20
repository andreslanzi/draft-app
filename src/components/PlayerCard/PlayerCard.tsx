import React from "react";
import { Player } from "../../store/store";

type props = {
	player: Player;
};

const PlayerCard = ({ player }: props) => {
	return (
		<div className="relative inline-flex">
			<button
				className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 m-1 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
				type="button"
			>
				{player.nick}
				<i className="icon-remove ml-2 hover:text-red-500"></i>
			</button>
		</div>
	);
};

export default PlayerCard;
