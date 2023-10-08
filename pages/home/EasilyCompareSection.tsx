import React, { useRef } from "react";
import RankGraph from "../../components/RankGraph";
import HomepageHeading from "./HomepageHeading";
import ClassmateButton from "../../components/ClassmateButton";
import useWindowSize from "../../hooks/useWindowSize";
import useFadeIn from "../../hooks/useFadeIn";

const EasilyCompareSection = () => {
	const { width } = useWindowSize();
	const elementRef = useRef();
	useFadeIn(elementRef);

	const handleTryFreeClick = () => {
		const heroSearchOne = document.querySelector("#hero-search-one");
		window.scrollTo({
			behavior: "smooth",
			top: 0, // Adjust the vertical position as needed
		});
		setTimeout(() => {
			heroSearchOne.focus();
		}, 800);
	};

	return (
		<section className="section-padding flex flex-col items-center justify-center  bg-classmate-tan-2 py-20 sm:pt-10  xl:py-44 xl:pt-24">
			<div
				ref={elementRef}
				className="flex w-full flex-col items-center justify-between gap-14 opacity-0 md:gap-16 lg:flex-row lg:justify-center xl:gap-20 3xl:gap-32">
				{width <= 1024 && (
					<HomepageHeading headingStyles={"lg:justify-start"}>
						Easily Compare
					</HomepageHeading>
				)}
				<div className="h-fit w-full max-w-[600px] lg:w-1/2 lg:max-w-[650px]">
					<RankGraph styles="!p-4" isHomepage={true} />
				</div>
				<div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-14 lg:max-w-[450px] lg:items-start">
					{width > 1024 && (
						<HomepageHeading headingStyles={"lg:justify-start"}>
							Easily Compare
						</HomepageHeading>
					)}
					<p className="font-classmate  text-center text-classmate-green-7   lg:text-left">
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
						fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
						Neque porro quisquam est, qui dolorem. Neque porro quisquam est, qui
						dolorem.
					</p>
					<ClassmateButton
						callback={handleTryFreeClick}
						variant="filled"
						size="lg"
						styles="bg-classmate-green-4 text-classmate-tan-2 lg:block">
						Try For Free
					</ClassmateButton>
				</div>
			</div>
		</section>
	);
};

export default EasilyCompareSection;
