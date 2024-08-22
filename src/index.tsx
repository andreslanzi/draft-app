import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { StoreProvider } from "./store/store";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<StoreProvider>
		<App />
	</StoreProvider>
);
