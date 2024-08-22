import { useState } from "react";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { useStore } from "../store/store";
import Column from "../components/Column";

const Container = styled.div`
	display: flex;
`;
const LessContainer = styled.div`
	display: flex;
	width: 90%;
`;
const BoardContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Step2 = (props) => {
	const { initialData, setActiveStep, activeStep } = useStore();
	const [boardData, setBoardData] = useState(initialData);

	console.log({ boardData });

	const getColumns = () => {
		return boardData.columnOrder
			.filter((col) => col !== "column-0")
			.map((columnId) => {
				const column = boardData.columns[columnId];
				console.log({ column });
				const players = column.playerIds.map(
					(playerId) => boardData.players[playerId]
				);
				console.log({ players });
				return (
					<Column key={column.id} column={column} players={players} />
				);
			});
	};

	const getFirstColumn = () => {
		return boardData.columnOrder
			.filter((col) => col === "column-0")
			.map((columnId) => {
				const column = boardData.columns[columnId];
				console.log({ column });
				const players = column.playerIds.map(
					(playerId) => boardData.players[playerId]
				);
				console.log({ players });

				return (
					<Column
						key={column.id}
						column={column}
						players={players}
						isNoTeamCol={true}
					/>
				);
			});
	};

	const onDragEnd = (result) => {
		console.log({ result });
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === "column-0" &&
			source.droppableId === "column-0"
		) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const start = boardData.columns[source.droppableId];
		const finish = boardData.columns[destination.droppableId];
		if (start === finish) {
			const newPlayerIds = Array.from(start.playerIds);
			newPlayerIds.splice(source.index, 1);
			newPlayerIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				playerIds: newPlayerIds,
			};
			const newBoardData = {
				...boardData,
				columns: {
					...boardData.columns,
					[newColumn.id]: newColumn,
				},
			};
			setBoardData(newBoardData);
			return;
		}

		//moving from one col to another
		const startPlayerIds = Array.from(start.playerIds);
		startPlayerIds.splice(source.index, 1);
		const newStart = {
			...start,
			playerIds: startPlayerIds,
		};

		const finishPlayerIds = Array.from(finish.playerIds);
		finishPlayerIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			playerIds: finishPlayerIds,
		};
		const newBoardData = {
			...boardData,
			columns: {
				...boardData.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		setBoardData(newBoardData);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<BoardContainer>
				<LessContainer>{getFirstColumn()}</LessContainer>
				<Container>{getColumns()}</Container>
			</BoardContainer>
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
					onClick={async () => {
						setActiveStep(activeStep + 1);
					}}
				>
					Continuar
				</button>
			</div>
		</DragDropContext>
	);
};

export default Step2;
