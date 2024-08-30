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
		<label
			for="uploadFile1"
			class="bg-green-800 hover:bg-green-700 text-white text-base p-2 m-auto outline-none rounded w-max cursor-pointer ml-2 font-[sans-serif]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 fill-white inline"
				viewBox="0 0 32 32"
			>
				<path
					d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
					data-original="#000000"
				/>
				<path
					d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
					data-original="#000000"
				/>
			</svg>

			<input
				type="file"
				id="uploadFile1"
				class="hidden"
				onChange={handleFileChange}
			/>
		</label>
	);
};
export default CsvFileInput;
