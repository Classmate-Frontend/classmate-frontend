import React, { useRef } from "react";

// Project components
import HomepageHeading from "./HomepageHeading";
import ClassmateButton from "../../components/ClassmateButton";

// Project hooks
import useFadeIn from "../../hooks/useFadeIn";

// Next.js components
import Image from "next/image";

// Define the steps data
const stepsData = [
	{
		number: 1,
		title: "Find Your School",
		imageSrc: "/box.svg",
		altText:
			"An illustration of a person searching for their school in a book, flipping through the pages with curiosity.",
		description:
			"Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro",
	},
	{
		number: 2,
		title: "Select Your Course",
		imageSrc: "/falling.svg",
		altText:
			"An illustration of a person clumsily fumbling and dropping paper, displaying a moment of mishap or clumsiness.",
		description:
			"Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro",
	},
	{
		number: 3,
		title: "Compare Professors",
		imageSrc: "/love.svg",
		altText:
			"An illustration of a person with a joyful expression, content and satisfied with their choice.",
		description:
			"Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro",
	},
];

function HowItWorksSection() {
	// Ref to access the section element for fade-in effect
	const elementRef = useRef<HTMLDivElement>(null);
	useFadeIn(elementRef);

	// Scroll to and focus on the search input in hero section
	const handleTryFreeClick = () => {
		const heroSearchOne =
			document.querySelector<HTMLInputElement>("#hero-search-one");
		if (heroSearchOne) {
			window.scrollTo({
				behavior: "smooth",
				top: 0,
			});
			setTimeout(() => {
				heroSearchOne.focus();
			}, 800);
		}
	};

	return (
		<section className="section-padding bg-classmate-tan-2 py-20 xl:py-40">
			<div ref={elementRef} className="flex flex-col opacity-0">
				{/* Heading */}
				<HomepageHeading>How It Works</HomepageHeading>

				{/* Steps */}
				<div className="my-10 flex flex-wrap justify-center xl:mt-16 xl:px-20">
					{stepsData.map((step) => (
						<div
							key={step.number}
							className="my-14 flex flex-grow flex-col items-center">
							{/* Step number and title */}
							<h6 className="font-classmate text-center text-2xl sm:text-[28px]">
								<span className="text-classmate-gold-1">{step.number}. </span>
								{step.title}
							</h6>

							{/* Step image */}
							<Image
								src={step.imageSrc}
								width={0}
								height={0}
								className="my-10 h-48 w-fit 3xl:h-auto 3xl:w-64"
								alt={step.altText}
							/>

							{/* Step description */}
							<p className="font-classmate max-w-[280px] text-center text-classmate-green-7">
								{step.description}
							</p>
						</div>
					))}
				</div>

				{/* Try for Free Button */}
				<ClassmateButton
					size="lg"
					variant="outlined"
					callback={handleTryFreeClick}
					styles="border-classmate-green-2 text-classmate-green-2 self-center bg-classmate-tan-2">
					Try For Free
				</ClassmateButton>
			</div>
		</section>
	);
}

export default HowItWorksSection;
