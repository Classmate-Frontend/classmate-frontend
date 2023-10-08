import React from "react";
// Next.js components
import Image from "next/image";

// Redux components
import { useSelector } from "react-redux";
import heroSearchOneInterface from "../../redux/hero-search-one/heroSearchOneInterface";

const HeroSearchResultSkeleton = () => {
	const heroSearchOne = useSelector(
		(state: { heroSearchOne: heroSearchOneInterface }) => state.heroSearchOne
	);

	return (
		<div>
			{[...Array(3)].map((_, index) => (
				<button
					key={index}
					type="button"
					className="flex w-full items-center border-b-[1px] bg-classmate-tan-2 px-5 py-5 text-left outline-none ring-classmate-gold-1 focus:bg-classmate-gray-5">
					<div className="mr-4 h-[32px] w-[32px] rounded-[4px] bg-classmate-gray-5" />
					<div className="flex flex-col justify-center gap-1">
						<div className="h-[14px] w-56 rounded-[4px] bg-classmate-gray-5" />
						<div className="h-[14px] w-24 rounded-[4px] bg-classmate-gray-5" />
					</div>
				</button>
			))}
		</div>
	);
};

export default HeroSearchResultSkeleton;
