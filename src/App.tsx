import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import "@atlaskit/css-reset";

function App() {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<div className="h-screen w-screen p-10">
			<div className="flex w-full flex-col justify-center items-center">
				<img
					src="https://pbs.twimg.com/media/GNyv55eW4AE2Qnn?format=png&name=4096x4096"
					alt="logo"
					className="max-w-[200px] mb-10"
				/>
			</div>
			{activeStep === 0 && (
				<Step1 activeStep={activeStep} setActiveStep={setActiveStep} />
			)}
			{activeStep === 1 && (
				<Step2 activeStep={activeStep} setActiveStep={setActiveStep} />
			)}
			{activeStep === 2 && (
				<Step3 activeStep={activeStep} setActiveStep={setActiveStep} />
			)}
		</div>
	);
}

export default App;
