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
	position: relative;
`;
const Title = styled.h3`
	padding: 8px;
	font-weight: 600;
	text-align: center;
`;
const PlayerList = styled.div<{ isNoTeamCol: any }>`
	padding: 8px;
	min-height: 100px;
	display: ${(props) => (props.isNoTeamCol ? "flex" : "flex")};
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

const Column = (props: any) => {
	return (
		<Container isNoTeamCol={props.isNoTeamCol}>
			<Title className="outline outline-0 uppercase text-[#EBF4F6]">
				{props.team.tag}
			</Title>
			<Droppable
				droppableId={props.team.id}
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
			<span className="absolute bottom-2 right-2 font-bold text-[#EBF4F6]">
				({props.players.length})
			</span>
		</Container>
	);
};

export default Column;
