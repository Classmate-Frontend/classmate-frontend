import React, { useEffect } from "react";

// Project components
import HeroSearchOneSelect from "./HeroSearchOneSelect";
import HeroSearchOneResults from "./HeroSearchOneResults";

// React Hook Form components
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";

// Next.js components
import Image from "next/image";
import { useRouter } from "next/router";

// Redux components
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import heroSearchOneInterface from "../../redux/hero-search-one/heroSearchOneInterface";
import {
	searchOne,
	clearSearchOne,
	saveSearchOneInput,
} from "../../redux/hero-search-one/heroSearchOneActions";

interface HeroSearchOneProps {
	setShowFirstSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSearchOne: React.FC<HeroSearchOneProps> = ({
	setShowFirstSearch,
}) => {
	// Next.js router
	const router = useRouter();

	// Redux setup
	const dispatch = useAppDispatch();
	const heroSearchOne = useSelector(
		(state: { heroSearchOne: heroSearchOneInterface }) => state.heroSearchOne
	);

	// React Hook Form setup
	const { handleSubmit, watch, register, setValue } = useForm();

	useEffect(() => {
		// Watch for changes in form input
		const subscription = watch((_, { name }) => {
			if (name === "userInput") {
				handleSubmit(onSubmit)();
			}
		});

		// Clear search and unsubscribe from form input on unmount
		return () => {
			dispatch(clearSearchOne());
			subscription.unsubscribe();
		};
	}, [watch]);

	// Debounced search function
	const onSubmit = useDebounce(({ userInput }: { userInput: string }) => {
		dispatch(saveSearchOneInput(userInput));
		if (userInput) {
			dispatch(searchOne(userInput));
		} else {
			dispatch(clearSearchOne());
		}
	}, 300);

	// Handle search button click
	const handleSearchClick = () => {
		router.push("/search");
	};

	useEffect(() => {
		return () => {
			dispatch(saveSearchOneInput(""));
		};
	}, []);

	return (
		// Hero Search Form
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative flex w-full items-center rounded-full bg-classmate-tan-2 shadow-lg">
			{/* Dropdown for selecting search type */}
			<HeroSearchOneSelect setValue={setValue} />

			{/* Search input */}
			<input
				id="hero-search-one"
				defaultValue=""
				{...register("userInput")}
				placeholder={`Enter ${heroSearchOne.type}`}
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

			{/* Display search results */}
			<HeroSearchOneResults
				setValue={setValue}
				setShowFirstSearch={setShowFirstSearch}
			/>
		</form>
	);
};

export default HeroSearchOne;
