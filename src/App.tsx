import { useState } from "react";
import "./App.css";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

function App() {
	const [activeStep, setActiveStep] = useState<number>(0);

	return (
		<div className="h-screen w-screen p-20">
			<h1 className="text-5xl bold text-blue-500 text-center mb-10">
				OM3GA DRAFT
			</h1>
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
