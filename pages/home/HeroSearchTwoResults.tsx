import React from "react";

import HeroSearchResultSkeleton from "./HeroSearchResultSkeleton";

// Next.js components
import { useRouter } from "next/router";
import Image from "next/image";

// Redux components
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";

// Import the interfaces for Redux states
import heroSearchOneInterface from "../../redux/hero-search-one/heroSearchOneInterface";
import heroSearchTwoInterface from "../../redux/hero-search-two/heroSearchTwoInterface";
import { setMultiMainSearchFilters } from "../../redux/main-search/mainSearchActions";
import { setMultiFilterSearchFilters } from "../../redux/filter-search/filterSearchActions";

// Define the component as a functional component
const HeroSearchTwoResults: React.FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	// Get search results and type from Redux store for heroSearchOne and heroSearchTwo
	const heroSearchOne = useSelector(
		(state: { heroSearchOne: heroSearchOneInterface }) => state.heroSearchOne
	);
	const heroSearchTwo = useSelector(
		(state: { heroSearchTwo: heroSearchTwoInterface }) => state.heroSearchTwo
	);

	// Handle clicking on a course result
	const handleCourseClick = (course: any) => {
		// Create filters object for main search
		const filters = {
			school: heroSearchOne.filters.school,
			course: {
				filter_value: course.firebaseID,
				filter_text: course.data.course_name,
			},
		};
		// Dispatch the filters to the main search Redux action
		dispatch(setMultiFilterSearchFilters(filters));
		dispatch(setMultiMainSearchFilters(filters));
		// Redirect to the search page
		router.push(`/search`);
	};

	// Handle clicking on a professor result
	const handleProfessorClick = (professor: any) => {
		// Redirect to the professor's page
		router.push(`/professor/${professor.firebaseID}`);
	};

	let resultsToDisplay;
	if (heroSearchTwo.loading) {
		resultsToDisplay = <HeroSearchResultSkeleton />;
	} else if (
		!heroSearchTwo.loading &&
		heroSearchTwo.userInput &&
		heroSearchTwo.results.length === 0
	) {
		resultsToDisplay = (
			<div className="font-classmate flex w-full items-center border-b-[1px] bg-classmate-tan-2 px-5 py-5 text-left text-classmate-green-7 outline-none ring-classmate-gold-1 hover:bg-classmate-gray-5 focus:bg-classmate-gray-5">
				No Results...
			</div>
		);
	} else {
		resultsToDisplay = heroSearchTwo.results.map((item: any, index: number) => (
			<button
				onClick={
					heroSearchTwo.type === "course"
						? () => handleCourseClick(item)
						: () => handleProfessorClick(item)
				}
				key={index}
				type="button"
				className={`flex w-full items-center border-b-[1px] bg-classmate-tan-2 px-5 py-5 text-left outline-none ring-classmate-gold-1 hover:bg-classmate-gray-5 focus:bg-classmate-gray-5`}>
				<Image
					height={0}
					width={0}
					src={
						heroSearchTwo.type === "course"
							? "/book-solid.svg"
							: "/glasses-solid.svg"
					}
					className="filter-classmate-green-7 mr-5 h-[20px] w-[20px]"
					alt="visiual depiction of a graduation cap or glasses that represents what you are searching for"
				/>
				<div className="flex flex-col justify-center gap-1">
					<p className="font-classmate leading-none text-classmate-green-6">
						{/* Display course name or professor's full name */}
						{heroSearchTwo.type === "course"
							? item.data.course_name
							: `${item.data.first_name} ${item.data.last_name}`}
					</p>
					<p className="font-classmate w-fit text-sm leading-none text-classmate-green-7">
						{/* Display course code or school name */}
						{heroSearchTwo.type === "course"
							? item.data.course_code
							: item.data.school_names?.[0]}
					</p>
				</div>
			</button>
		));
	}

	// Render the search results component
	return (
		<div className="absolute top-16 z-10 w-full overflow-hidden rounded-xl shadow-lg">
			{resultsToDisplay}
		</div>
	);
};

export default HeroSearchTwoResults;
