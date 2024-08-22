import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
`;

const Player = (props: any) => {
	console.log({ props });
	return (
		<Draggable draggableId={props.player.id} index={props.index}>
			{(provided) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="w-[120px] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 m-1 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
						{props.player.nick}
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Player;
