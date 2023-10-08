import React, { useState } from "react";

// Project components
import DropMenu from "../../components/DropMenu";

// Next.js components
import Image from "next/image";

// Redux components
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setSearchOneType } from "../../redux/hero-search-one/heroSearchOneActions";

// Interface for the individual menu item
interface MenuItem {
	icon: string;
	label: string;
	id: string;
	width: number;
	height: number;
	alt: string;
}

// Menu items for selecting search type (school or professor)
const menuItems: MenuItem[] = [
	{
		icon: "/graduation-cap-solid.svg",
		label: "School",
		id: "school",
		width: 20,
		height: 20,
		alt: "",
	},
	{
		icon: "/glasses-solid.svg",
		label: "Professor",
		id: "professor",
		width: 20,
		height: 20,
		alt: "",
	},
];

// Component to select between school and professor search types
const HeroSchoolAndProfessorSelect: React.FC<{ setValue: Function }> = ({
	setValue,
}) => {
	// State to manage menu open/closed state
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// Redux dispatch and selector
	const dispatch = useAppDispatch();
	const heroSearchOne = useSelector((state: any) => state.heroSearchOne);

	// Handle menu button click to toggle menu visibility
	const handleMenuClick = () => {
		setMenuOpen((current) => !current);
	};

	// Handle selection of a menu item (school or professor)
	const handleMenuItemClick = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		const { id } = e.target as HTMLLIElement;
		if (id !== heroSearchOne.type) {
			dispatch(setSearchOneType(id)); // Update search type
			setValue("userInput", ""); // Clear input field
		}
		setMenuOpen(false); // Close the menu
	};

	// Determine which icon to display based on selected search type
	const selectedIcon =
		heroSearchOne.type === "school"
			? "/graduation-cap-solid.svg"
			: "/glasses-solid.svg";

	return (
		<div className="relative h-[55px] ">
			{/* Button to toggle menu */}
			<button
				type="button"
				className="flex h-full cursor-pointer items-center justify-center rounded-bl-full rounded-tl-full pl-6 pr-4 outline-none ring-classmate-gold-1 transition-colors hover:bg-classmate-gray-5 focus:ring"
				onClick={handleMenuClick}>
				<div className="pointer-events-none flex select-none items-center justify-center gap-2">
					{/* Display selected icon and dropdown caret */}
					<Image
						src={selectedIcon}
						height={0}
						width={0}
						alt="icon"
						className="filter-classmate-green-7 h-[25px] w-[25px] min-w-[25px]"
					/>
					<Image
						src="/caret-solid.svg"
						className={`filter-classmate-green-4 h-[10px] w-[10px] min-w-[10px] ${
							menuOpen ? "rotate-180" : ""
						}`}
						height={0}
						width={0}
						alt="caret"
					/>
				</div>
			</button>
			{/* Dropdown menu for selecting search type */}
			<DropMenu
				styles="right-auto left-0 sm:right-0 sm:left-auto"
				menuItems={menuItems}
				callback={handleMenuItemClick}
				menuOpen={menuOpen}
				closeMenu={() => setMenuOpen(false)}
			/>
		</div>
	);
};

export default HeroSchoolAndProfessorSelect;
