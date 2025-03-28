import React from "react";
import "../../App.css";
import { cardDetails } from "../../lib/utils";
import CarouselItem from "../CarouselItem";

export default function AutoplayCarousel() {
	return (
		<div className="carousel-container">
			<div className="carousel-track">
				{cardDetails.map((card, idx) => {
					return (
						<CarouselItem
							imgUrl={card.image}
							key={idx}
						></CarouselItem>
					);
				})}
				{cardDetails.map((card, idx) => {
					return (
						<CarouselItem
							imgUrl={card.image}
							key={idx}
						></CarouselItem>
					);
				})}
			</div>
		</div>
	);
}
