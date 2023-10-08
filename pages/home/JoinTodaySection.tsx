import React, { useRef } from "react";

// Project components
import ClassmateButton from "../../components/ClassmateButton";

// Project hooks
import useApplyClassWhenInView from "../../hooks/useApplyClassWhenInView";

// Next.js components
import { useRouter } from "next/router";

// Define the JoinTodaySection component as a functional component with React.FC type.
const JoinTodaySection: React.FC = () => {
	// Add fade-in effect when in view
	const elementToObserve = useRef();
	const elementToApplyClasses = useRef();
	useApplyClassWhenInView(
		elementToObserve,
		elementToApplyClasses,
		"!opacity-100"
	);

	// Access the Next.js router for navigation.
	const router = useRouter();

	// Callback function for handling the "Join Today" button click.
	const handleJoinTodayClick = () => {
		router.push("/signup"); // Redirect to the signup page.
	};

	// Callback function for handling the "Get Started" button click.
	const handleGetStartedClick = () => {
		router.push("/search"); // Redirect to the search page.
	};

	return (
		<section
			ref={elementToObserve}
			className="section-padding bg-classmate-tan-1">
			<div
				ref={elementToApplyClasses}
				className="flex flex-col items-center justify-center px-10 py-12 !opacity-0 !transition-all !duration-1000 sm:flex-row sm:gap-12 xl:py-16 2xl:px-16 3xl:gap-28">
				{/* Paragraph describing the section */}
				<p className="font-classmate flex max-w-[280px] text-center text-classmate-green-1 sm:max-w-none sm:text-left sm:text-lg md:text-xl lg:text-2xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore
				</p>
				{/* Button section */}
				<div className="mt-8 flex flex-col items-center justify-center gap-2 sm:mt-0 lg:flex-row xl:gap-8">
					{/* "Join Today" button */}
					<ClassmateButton
						callback={handleJoinTodayClick}
						variant="filled"
						size="md"
						styles="bg-classmate-green-2 text-classmate-tan-1 hover:!bg-classmate-hover-green-2">
						Join Today
					</ClassmateButton>
					{/* "Get Started" button */}
					<ClassmateButton
						callback={handleGetStartedClick}
						size="md"
						variant="outlined"
						styles="border-classmate-green-2 text-classmate-green-2 bg-classmate-tan-1">
						Get Started
					</ClassmateButton>
				</div>
			</div>
		</section>
	);
};

export default JoinTodaySection;
