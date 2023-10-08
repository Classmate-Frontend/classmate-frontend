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
		<section className="section-padding flex justify-center bg-classmate-tan-2 py-20 xl:py-36">
			<div
				ref={elementRef}
				className="xl:gap-18 3xl:gap-26 flex flex-col items-center opacity-0 lg:flex-row lg:gap-20">
				<div className="">
					{/* Homepage heading */}
					<HomepageHeading headingStyles={"lg:justify-start"}>
						Our Goal
					</HomepageHeading>
					{/* Description */}
					<p className="font-classmate mx-auto py-12 text-center text-classmate-green-7 sm:max-w-xl  lg:mx-0 lg:max-w-[450px] lg:py-10 lg:text-left">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
						totam voluptate soluta velit officia commodi nulla laudantium unde
						blanditiis? At, vel. Quas, possimus? Assumenda laborum consequuntur
						eius laboriosam iste minus officia adipisci dolorem perferendis
						voluptatem.
					</p>
					{/* "Get Started" button */}
					<ClassmateButton
						href="./search"
						callback={handleGetStartedClick}
						variant="filled"
						size="lg"
						styles="hidden bg-classmate-pink-1 text-classmate-tan-2 lg:block hover:!brightness-105 !transition-all !duration-800">
						Get Started
					</ClassmateButton>
				</div>
				{/* Grid of offering cards */}
				<div className="max-w-[600px] xl:max-w-none">
					<Image
						width={700}
						height={700}
						src="/our-goal.svg"
						alt="a group of helpful people"
						className="h-auto w-[700px]"
					/>
				</div>
				{/* "Get Started" button (hidden on larger screens) */}
				<ClassmateButton
					callback={handleGetStartedClick}
					href="./search"
					variant="filled"
					size="lg"
					styles="mt-10 bg-classmate-pink-1 text-classmate-tan-1 lg:hidden">
					Get Started
				</ClassmateButton>
			</div>
		</section>
	);
}
