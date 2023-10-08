import React, { useEffect } from "react";

// Project components
import HeroSearchTwoSelect from "./HeroSearchTwoSelect";
import HeroSearchTwoResults from "./HeroSearchTwoResults";

// Project hooks
import useDebounce from "../../hooks/useDebounce";

// React Hook Form components
import { useForm } from "react-hook-form";

// Next.js components
import Image from "next/image";
import { useRouter } from "next/router";

// Redux components
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import heroSearchTwoInterface from "../../redux/hero-search-two/heroSearchTwoInterface";
import {
	searchTwo,
	clearSearchTwo,
	setSearchTwoType,
	saveSearchTwoInput,
} from "../../redux/hero-search-two/heroSearchTwoActions";

const HeroSearchTwo: React.FC<{
	setShowFirstSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowFirstSearch }) => {
	// Get router instance from Next.js
	const router = useRouter();

	// Get dispatch function from custom redux hook
	const dispatch = useAppDispatch();

	// Get heroSearchTwo state from Redux store
	const heroSearchTwo = useSelector(
		(state: { heroSearchTwo: heroSearchTwoInterface }) => state.heroSearchTwo
	);

	// Destructure form-related functions from useForm hook
	const { handleSubmit, watch, register, setValue } = useForm();

	useEffect(() => {
		// Subscribe to the "userInput" field changes for debouncing
		const subscription = watch((_, { name }) => {
			if (name === "userInput") {
				handleSubmit(onSubmit)();
			}
		});

		// Unsubscribe from the field changes when component unmounts
		return () => {
			// Dispatch an action to clear search results
			dispatch(clearSearchTwo());
			subscription.unsubscribe();
		};
	}, [watch]);

	useEffect(() => {
		// Set the search type when the component mounts
		dispatch(setSearchTwoType("course"));
	}, []);

	const onSubmit = useDebounce(({ userInput }: { userInput: string }) => {
		dispatch(saveSearchTwoInput(userInput));
		if (userInput) {
			// Dispatch search action if userInput is not empty
			dispatch(searchTwo(userInput));
		} else {
			// Clear search results if userInput is empty
			dispatch(clearSearchTwo());
		}
	}, 300);

	const handleSearchClick = () => {
		// Redirect to search page when search button is clicked
		router.push("/search");
	};

	useEffect(() => {
		return () => {
			dispatch(saveSearchTwoInput(""));
		};
	}, []);

	// Render the component
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative flex w-full items-center rounded-full bg-classmate-tan-2 shadow-lg">
			{/* Dropdown menu for selecting search type */}
			<HeroSearchTwoSelect setValue={setValue} />
			{/* Input field for user search input */}
			<input
				defaultValue=""
				{...register("userInput")}
				placeholder={`Enter ${heroSearchTwo.type}`}
				type="text"
				className="font-classmate z-10 h-[55px] w-full rounded-br-full rounded-tr-full bg-transparent pl-3 text-lg text-classmate-green-6 placeholder-classmate-green-6 outline-none ring-classmate-gold-1 focus:ring"
			/>
			{/* Search button */}
			<button
				type="button"
				onClick={handleSearchClick}
				className="absolute right-[4px] z-20 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-classmate-tan-2 outline-none ring-classmate-gold-1 transition-colors hover:bg-classmate-gray-5 focus:ring">
				<Image
					src="/search-solid.svg"
					width={0}
					height={0}
					alt="magnifying glass"
					className="filter-classmate-green-4 h-[22px] w-[22px]"
				/>
			</button>
			{/* Search results component */}
			<HeroSearchTwoResults />
		</form>
	);
};

export default HeroSearchTwo;
