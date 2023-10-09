// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from "react";

// Project components
import FormSelectOptions from "./FormSelectOptions";

// Project hooks
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

// Next.js components
import Image from "next/image";

// Fuzzy search
import Fuse from "fuse.js";

// React hook form
import { Controller, useFormContext } from "react-hook-form";

// Redux
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useSelector } from "react-redux";
import {
	setFormSearchType,
	search,
} from "../../redux/form-search/formSearchActions";

type InputProps = {
	type?: "select" | "local-search" | "database-search";
	size: "sm" | "lg";
	searchType?: "school" | "course";
	name: string;
	label: string;
	backgroundColor: string;
	setValue: any;
	getValues: any;
	children?: any;
	rules: Record<string, unknown>;
};

const FormSelect: FC<InputProps> = ({
	name,
	size = "lg",
	label,
	rules,
	type = "select",
	searchType,
	setValue,
	getValues,
	children,
	backgroundColor,
}) => {
	const { control } = useFormContext();

	const [moveLabel, setMoveLabel] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);
	const [changeLabelColor, setChangeLabelColor] = useState(false);

	const labelRef = useRef();
	const selectRef = useRef();
	const searchRef = useRef();

	const dispatch = useAppDispatch();

	// Select
	const [selectOptionsWithProps, setSelectOptionsWithProps] = useState([]);

	const addProps = (children) => {
		return children.map((child) => {
			return React.cloneElement(child, {
				selected: child.props.text.toString() === getValues(name),
				selectName: name,
			});
		});
	};

	useEffect(() => {
		if (type === "select") {
			const optionsWithProps = addProps(children);
			setSelectOptionsWithProps(optionsWithProps);
		}
	}, [getValues(name)]);

	// Local search
	const [localSearchValue, setLocalSearchValue] = useState("");
	const [localSearchResults, setLocalSearchResults] = useState([]);

	const handleLocalSearchChange = (e) => {
		setLocalSearchValue(e.target.value);
	};

	const getDefaultLocalSearchResults = () => {
		return children.map((child) => {
			return {
				item: child,
			};
		});
	};

	const getLocalSearchResults = () => {
		const options = {
			includeScore: true,
			keys: ["props.text"],
		};

		const fuse = new Fuse(children, options);

		return fuse.search(localSearchValue);
	};

	useEffect(() => {
		if (type === "local-search") {
			if (!localSearchValue) {
				const results = getDefaultLocalSearchResults().map(({ item }) => item);
				setLocalSearchResults(addProps(results));
			} else {
				const results = getLocalSearchResults().map(({ item }) => item);
				setLocalSearchResults(addProps(results));
			}
		}
	}, [localSearchValue, getValues(name)]);

	// Database Search
	const formSearch = useSelector((state) => state.formSearch);
	const [databaseSearchValue, setDatabaseSearchValue] = useState("");
	const inputBlurred = useRef(false);

	const handleDatabaseSearchChange = (e) => {
		setDatabaseSearchValue(e.target.value);
		dispatch(search(e.target.value));
	};

	useOutsideAlerter((e) => {
		setChangeLabelColor(false);
		const searchInputClicked = e.target.closest("#local-search-input");
		const selectName = e.target.dataset.selectname;
		const selectedOption = e.target.dataset.value;
		const selectedOptionId = e.target.dataset.id;
		if (!searchInputClicked) {
			const currentOption = getValues(name);
			if (
				selectedOption &&
				name === selectName &&
				selectedOption != currentOption
			) {
				if (selectName === "school") {
					setValue("school_id", selectedOptionId);
				}
				setValue(selectName, selectedOption);
			} else if (!currentOption) {
				setMoveLabel(false);
			}

			setInputFocused(false);
		}
	}, selectRef);

	const activateInput = () => {
		if (!moveLabel) {
			setMoveLabel(true);
		}

		if (!inputFocused) {
			setChangeLabelColor(true);
			setInputFocused(true);
		}
	};

	const deactivateInput = () => {
		const currentValue = getValues(name);
		if (!currentValue) {
			setMoveLabel(false);
		}
		setChangeLabelColor(false);
		setInputFocused(false);

		selectRef.current.blur();
	};

	const handleKeyDown = (e) => {
		if (type !== "select") {
			e.preventDefault();
			searchRef.current.focus();
			if (e.key !== "Tab") {
				if (type === "database-search") {
					setDatabaseSearchValue(e.key);
					dispatch(search(e.key));
				} else {
					setLocalSearchValue(e.key);
				}
			}
		} else if (e.key === "Tab") {
			deactivateInput();
		}
	};

	const handleSelectBlur = () => {
		setChangeLabelColor(false);
		selectRef.current.blur();
	};

	const hanldeInputClick = (e) => {
		if (type === "database-search" && !inputFocused && !databaseSearchValue) {
			dispatch(setFormSearchType(searchType));
			dispatch(search(""));
		}

		if (inputFocused) {
			deactivateInput();
			inputBlurred.current = true;
		} else {
			activateInput();
		}
	};

	const handleInputFocus = () => {
		if (!inputBlurred.current) {
			activateInput();
		} else {
			inputBlurred.current = false;
		}
	};

	useEffect(() => {
		if (!inputFocused) {
			setTimeout(() => {
				if (type === "local-search") {
					setLocalSearchValue("");
				} else if (type === "database-search") {
					setDatabaseSearchValue("");
				}
			}, 100);
		}
	}, [inputFocused]);

	const labelTranslate =
		size === "lg" ? "-translate-y-[29px]" : "-translate-y-[25px]";

	const dropDownOffset = size === "lg" ? "top-[58px]" : "top-[50px]";

	// Results search inputs
	const handleResultsSearchKeyDown = (e) => {
		if (e.key === "Tab") {
			deactivateInput();
		}
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<div className="relative flex w-full items-center">
					<span
						ref={labelRef}
						className={`font-classmate pointer-events-none absolute left-[18px] px-1 text-base text-classmate-green-7 transition-all duration-200 ${backgroundColor} ${
							moveLabel || value ? `${labelTranslate} text-sm` : ""
						}`}>
						<p
							className={`whitespace-nowrap ${
								changeLabelColor ? "text-classmate-gold-1" : ""
							} ${error ? "!text-classmate-error-red" : ""}`}>
							{label}
						</p>
					</span>
					<input
						autocomplete="new-password"
						id={name}
						data-selectname={name}
						ref={selectRef}
						onMouseDown={(e) => hanldeInputClick(e)}
						onKeyDown={(e) => handleKeyDown(e)}
						onFocus={handleInputFocus}
						onBlur={handleSelectBlur}
						onChange={onChange}
						value={value || ""}
						className={`font-classmate w-full cursor-pointer rounded-md border-[1px] border-classmate-gray-2 bg-transparent px-4  text-classmate-green-7 placeholder-classmate-green-7 caret-transparent hover:border-classmate-gray-1 ${
							size === "sm" ? "py-3" : "py-4"
						} ${
							!!error
								? `!border-classmate-error-red !placeholder-classmate-error-red focus:!outline-classmate-error-red`
								: `${
										inputFocused ? "outline-classmate-gold-1" : "outline-none"
								  }`
						}`}
					/>
					<div
						className={`pointer-events-none absolute right-1 flex h-8 w-8 items-center justify-center bg-classmate-tan-2 `}>
						<Image
							src="/caret-solid.svg"
							alt="caret"
							height={0}
							width={0}
							className={`filter-classmate-green-7 h-[12px] w-[12px] transition-all ${
								inputFocused ? "rotate-180" : ""
							}`}
						/>
					</div>

					<div
						className={`absolute z-10 flex max-h-[300px] w-full origin-top cursor-pointer flex-col gap-2 overflow-y-auto rounded-lg bg-classmate-tan-2 p-4 shadow-xl transition-all ${dropDownOffset} ${
							inputFocused
								? "pointer-events-auto scale-100 opacity-100"
								: "pointer-events-none scale-75 opacity-0"
						} }`}>
						{type === "select" && (
							<div className="flex flex-col gap-2">
								{selectOptionsWithProps}
							</div>
						)}
						{type === "local-search" && (
							<>
								<div
									id="local-search-input"
									className="mb-2 flex min-h-[40px] items-center overflow-hidden rounded-md border-[1px] border-classmate-gray-3">
									<Image
										src="/search-solid.svg"
										width={0}
										height={0}
										alt=""
										className="filter-classmate-green-4 mx-3 h-[20px] w-[20px]"
									/>
									<input
										autocomplete="new-password"
										ref={searchRef}
										value={localSearchValue}
										onChange={(e) => handleLocalSearchChange(e)}
										onKeyDown={(e) => handleResultsSearchKeyDown(e)}
										placeholder="Search"
										type="text"
										className={`font-classmate z-10 h-10 w-full bg-transparent text-classmate-green-7 placeholder-classmate-green-7 outline-none`}
									/>
								</div>
								<div className="flex flex-col gap-2">{localSearchResults}</div>
							</>
						)}
						{type === "database-search" && (
							<>
								<div
									id="local-search-input"
									className="mb-2 flex min-h-[40px] items-center overflow-hidden rounded-md border-[1px] border-classmate-gray-3">
									<Image
										src="/search-solid.svg"
										width={0}
										height={0}
										alt=""
										className="filter-classmate-green-4 mx-3 h-[20px] w-[20px]"
									/>
									<input
										autocomplete="new-password"
										ref={searchRef}
										value={databaseSearchValue || ""}
										onChange={(e) => handleDatabaseSearchChange(e)}
										onKeyDown={(e) => handleResultsSearchKeyDown(e)}
										placeholder="Search"
										type="text"
										className={`font-classmate z-10 h-10 w-full bg-transparent text-classmate-green-7 placeholder-classmate-green-7 outline-none`}
									/>
								</div>
								<div className="flex flex-col gap-2">
									{formSearch.results.map(({ firebaseID, data }, index) => {
										return searchType === "school" ? (
											<FormSelectOptions
												key={index}
												icon="/graduation-cap-solid.svg"
												text={data.school_name}
												selected={data.school_name === getValues(name)}
												id={firebaseID}
												selectName={name}
											/>
										) : (
											<FormSelectOptions
												key={index}
												icon="/book-solid.svg"
												text={data.school_name}
												selected={data.school_name === getValues(name)}
												selectName={name}
											/>
										);
									})}
								</div>
							</>
						)}
					</div>
				</div>
			)}
		/>
	);
};

export default FormSelect;
