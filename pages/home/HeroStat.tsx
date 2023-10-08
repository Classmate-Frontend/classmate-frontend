import React from "react";

// Project components
import AnimatedNumber from "./AnimatedNumber";

// Interface to define the props for HeroStat component
interface HeroStatProps {
	text: string;
	number: number;
	plus?: boolean;
}

// HeroStat component
const HeroStat: React.FC<HeroStatProps> = ({ text, number, plus = false }) => {
	return (
		<div className="flex min-w-[205px] flex-col items-center justify-center text-classmate-green-1 sm:min-w-0">
			{/* Animated number with optional plus sign */}
			<div
				data-number={number}
				id="number"
				className="font-classmate-bold flex text-5xl lg:text-[56px]">
				<AnimatedNumber n={number} />
				{`${plus ? "+" : ""}`}
			</div>
			{/* Display the text */}
			<p className="font-classmate-italic text-xl lg:text-xl">{text}</p>
		</div>
	);
};

export default HeroStat;
