import GroupCard from "../components/GroupCard";
import PlayerCard from "../components/PlayerCard";
import { useStore } from "../store/store";

type props = {
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const Step22 = ({ activeStep, setActiveStep }: props) => {
	const { players, groupsQuantity, initialData } = useStore();
	console.log({ initialData });
	return (
		<div className="w-full">
			<div className="flex flex-col justify-center items-center">
				<h2 className="text-2xl font-bold uppercase mb-5">Jugadores</h2>
				<div className="inline-flex flex-wrap">
					{players.length > 0 &&
						players.map((player, idx) => (
							<PlayerCard
								player={player}
								key={idx}
								canDelete={false}
							/>
						))}
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
					onClick={() => setActiveStep(activeStep + 1)}
				>
					Continuar
				</button>
			</div>
		</div>
	);
};

export default Step22;
