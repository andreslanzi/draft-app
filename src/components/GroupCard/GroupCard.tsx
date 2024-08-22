type props = {
	idx: number;
};

const GroupCard = ({ idx }: props) => {
	return <div>GroupCard {idx + 1}</div>;
};

export default GroupCard;
