import * as Papa from "papaparse";

const CsvFileInput = ({ onFileLoad }) => {
	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			Papa.parse(file, {
				complete: (result) => {
					onFileLoad(result.data);
				},
				header: true,
				dynamicTyping: true,
				skipEmptyLines: true,
			});
		}
	};
	return (
		<div class="w-auto p-2 ml-2 border border-cyan-400 rounded-lg">
			<div class="flex items-center justify-center">
				<label>
					<input type="file" onChange={handleFileChange} hidden />
					<div class="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-xl shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
						Importar CSV
					</div>
				</label>
			</div>
		</div>
	);
};
export default CsvFileInput;
