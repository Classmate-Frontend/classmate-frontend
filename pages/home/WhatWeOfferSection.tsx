import React, { useRef } from "react";

// Project components
import HomepageHeading from "./HomepageHeading";
import ClassmateButton from "../../components/ClassmateButton";

// Project hooks
import useFadeIn from "../../hooks/useFadeIn";

// Next.js components
import Image from "next/image";
import { useRouter } from "next/router";

// Interface for each offering card
interface Offering {
	icon: string;
	title: string;
	description: string;
}

// Data for each offering card
const whatWeOfferInfoCard: Offering[] = [
	{
		icon: "/folder-solid.svg",
		title: "Save Your Courses",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
	},
	{
		icon: "/pie-solid.svg",
		title: "Better Insights",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
	},
	{
		icon: "/robot-solid.svg",
		title: "AI Powered",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
	},
	{
		icon: "/hand-heart-solid.svg",
		title: "Easy To Use",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
	},
];

export default function WhatWeOffer() {
	// Ref for element to apply fade-in effect
	const elementRef = useRef<HTMLDivElement>(null);
	useFadeIn(elementRef);

	// Router instance for navigation
	const router = useRouter();

	// Event handler for the "Get Started" button click
	const handleGetStartedClick = () => {
		router.push("/search");
	};

	return (
		<section className="section-padding flex justify-center bg-classmate-tan-2 py-20 sm:pb-10 xl:py-44 xl:pb-24">
			<div
				ref={elementRef}
				className="xl:gap-18 flex flex-col items-center opacity-0 lg:flex-row lg:gap-20 3xl:gap-40">
				<div className="">
					{/* Homepage heading */}
					<HomepageHeading headingStyles={"lg:justify-start"}>
						What We Offer
					</HomepageHeading>
					{/* Description */}
					<p className="font-classmate mx-auto max-w-[280px] py-12 text-center text-classmate-green-7 sm:max-w-xl  lg:mx-0 lg:max-w-[450px] lg:py-10 lg:text-left">
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
						fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
					</p>
					{/* "Get Started" button */}
					<ClassmateButton
						callback={handleGetStartedClick}
						variant="filled"
						size="lg"
						styles="hidden bg-classmate-gold-1 text-classmate-tan-2 lg:block">
						Get Started
					</ClassmateButton>
				</div>
				{/* Grid of offering cards */}
				<div className="grid grid-cols-1 grid-rows-4 gap-6 sm:grid-cols-2 sm:grid-rows-2 lg:max-w-[585px] 3xl:max-w-none 3xl:gap-10">
					{whatWeOfferInfoCard.map((offering, index) => (
						<div
							key={index}
							className="max-w-[280px] rounded-xl border-[1px] border-classmate-green-4 p-8">
							{/* Offering icon */}
							<Image
								src={offering.icon}
								width={0}
								height={0}
								className="filter-classmate-green-4 h-10 w-10"
								alt={`An icon of ${offering.title}`}
							/>
							{/* Offering title */}
							<h6 className="font-classmate-bold py-3 text-xl text-classmate-green-1">
								{offering.title}
							</h6>
							{/* Offering description */}
							<p className="font-classmate text-sm text-classmate-green-7 2xl:text-base">
								{offering.description}
							</p>
						</div>
					))}
				</div>
				{/* "Get Started" button (hidden on larger screens) */}
				<ClassmateButton
					callback={handleGetStartedClick}
					variant="filled"
					size="lg"
					styles="mt-10 bg-classmate-gold-1 text-classmate-tan-2 lg:hidden">
					Get Started
				</ClassmateButton>
			</div>
		</section>
	);
}
