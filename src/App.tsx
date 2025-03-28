import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import "@atlaskit/css-reset";
import { useStore } from "./store/store";
import "./App.css";
import AutoplayCarousel from "./components/AutoplayCarousel";

function App() {
	const { activeStep } = useStore();
	return (
		<div className="h-screen w-screen p-10 App">
			<div className="flex w-full justify-center m-auto items-center">
				<img
					src="https://i.imgur.com/erZtXAL.png"
					alt="logo"
					style={{ maxHeight: "100px" }}
				/>
				<h2 className="logoText">MOMBOCHOS CREW</h2>
				<img
					src="https://i.imgur.com/erZtXAL.png"
					alt="logo"
					style={{ maxHeight: "100px" }}
				/>
			</div>
			<AutoplayCarousel />
			{activeStep === 0 && <Step1 />}
			{activeStep === 1 && <Step2 />}
			{activeStep === 2 && <Step3 />}
		</div>
	);
}

export default App;
