import React, { useRef } from "react";

// Project components
import HeroStat from "./HeroStat";
import ClassmateButton from "../../components/ClassmateButton";

// Project hooks
import useIsInWindow from "../../hooks/useIsInWindow";

// HeroStatsSection component
const HeroStatsSection: React.FC = () => {
	// Ref to track the element for fade-in effect
	const elementRef = useRef<HTMLDivElement>(null);

	// Custom hook to check if the component is in the viewport
	const isInWindow = useIsInWindow(elementRef);

	return (
		<div ref={elementRef} className="section-padding bg-classmate-tan-1 py-16">
			{/* Conditional opacity transition based on isInWindow */}
			<div
				className={`!opacity-0 !transition-opacity !duration-1000 ${
					isInWindow ? "!opacity-100" : ""
				}`}>
				{isInWindow ? (
					// Content displayed when component is in the viewport
					<div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
						<div className="flex w-full flex-wrap justify-around gap-8 xl:gap-0 xl:px-12">
							{/* HeroStat components */}
							<HeroStat text="Schools" number={152} />
							<HeroStat text="Professors" number={400} plus={true} />
							<HeroStat text="Courses" number={1200} plus={true} />
							<HeroStat text="Ratings" number={5000} plus={true} />
						</div>
						<div>
							{/* Join Today Button */}
							<ClassmateButton
								href="./signup"
								size="lg"
								variant="filled"
								styles="h-fit bg-classmate-green-2 text-classmate-tan-2 hover:!bg-classmate-hover-green-2">
								Join Today
							</ClassmateButton>
						</div>
					</div>
				) : (
					// Placeholder when component is not in the viewport
					<div className="h-[165px] w-full"></div>
				)}
			</div>
		</div>
	);
};

export default HeroStatsSection;
