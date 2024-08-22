import styled from "styled-components";
import Player from "./Player";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div<{ isNoTeamCol: any }>`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: ${(props) => (props.isNoTeamCol ? "100%" : "220px")};
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
	padding: 8px;
`;
const PlayerList = styled.div<{ isNoTeamCol: any }>`
	padding: 8px;
	flex-grow: 1;
	min-height: 100px;
	display: ${(props) => (props.isNoTeamCol ? "flex" : "block")};
	flex-wrap: wrap;
`;

const Column = (props: any) => {
	console.log({ props });
	return (
		<Container isNoTeamCol={props.isNoTeamCol}>
			<Title>{props.column.title}</Title>
			<Droppable
				droppableId={props.column.id}
				direction={props.isNoTeamCol ? "horizontal" : "vertical"}
			>
				{(provided) => (
					<PlayerList
						isNoTeamCol={props.isNoTeamCol}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{props.players.map((p: any, idx: number) => (
							<Player key={p.id} player={p} index={idx} />
						))}
						{provided.placeholder}
					</PlayerList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
