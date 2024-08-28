import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import "@atlaskit/css-reset";
import { useStore } from "./store/store";
import "./App.css";

function App() {
	const { activeStep } = useStore();
	return (
		<div className="h-screen w-screen p-10 bg-[#071952]">
			<div className="flex w-full flex-col justify-center items-center">
				<img
					src="https://pbs.twimg.com/media/GNyv55eW4AE2Qnn?format=png&name=4096x4096"
					alt="logo"
					className="max-h-[120px] mb-10"
				/>
			</div>
			{activeStep === 0 && <Step1 />}
			{activeStep === 1 && <Step2 />}
			{activeStep === 2 && <Step3 />}
		</div>
	);
}

export default App;
