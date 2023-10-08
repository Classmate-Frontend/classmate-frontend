import React, { useState, useEffect } from "react";

// Project components
import DropMenu from "../../components/DropMenu";

// Next.js components
import Image from "next/image";

// Redux components
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import heroSearchTwoInterface from "../../redux/hero-search-two/heroSearchTwoInterface";
import { setSearchTwoType } from "../../redux/hero-search-two/heroSearchTwoActions";

// Define the shape of each menu item
interface MenuItem {
	icon: string;
	label: string;
	id: string;
	width: number;
	height: number;
	alt: string;
}

// Create an array of menu items
const menuItems: MenuItem[] = [
	{
		icon: "/book-solid.svg",
		label: "Course",
		id: "course",
		width: 17,
		height: 17,
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

// Define the props for the HeroSearchTwoSelect component
interface HeroSearchTwoSelectProps {
	setValue: (name: string, value: any) => void;
}

// HeroSearchTwoSelect component
const HeroSearchTwoSelect: React.FC<HeroSearchTwoSelectProps> = ({
	setValue,
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// Redux setup
	const dispatch = useAppDispatch();
	const heroSearchTwo = useSelector(
		(state: { heroSearchTwo: heroSearchTwoInterface }) => state.heroSearchTwo
	);

	// Handler for opening/closing the menu
	const handleMenuClick = () => {
		setMenuOpen((current) => !current);
	};

	// Handler for selecting a menu item
	const handleMenuItemClick = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		const { id } = e.currentTarget;
		if (id !== heroSearchTwo.type) {
			dispatch(setSearchTwoType(id));
			setValue("userInput", "");
		}
		setMenuOpen(false);
	};

	return (
		<div className="relative h-[55px]">
			<button
				type="button"
				className="flex h-full cursor-pointer items-center justify-center rounded-bl-full rounded-tl-full pl-6 pr-4 outline-none ring-classmate-gold-1 transition-colors hover:bg-classmate-gray-5 focus:ring"
				onClick={handleMenuClick}>
				<div className="pointer-events-none flex select-none items-center justify-center gap-2">
					<Image
						src={
							heroSearchTwo.type === "course"
								? "./book-solid.svg"
								: "./glasses-solid.svg"
						}
						height={0}
						width={0}
						alt="visiual depiction of a graduation cap or glasses that represents what you are searching for"
						className={`filter-classmate-green-7 w-[25px] min-w-[25px] ${
							heroSearchTwo.type === "course"
								? "h-[23px] max-h-[23px] "
								: "h-[25px]"
						}`}
					/>
					<Image
						src="./caret-solid.svg"
						className={`filter-classmate-green-4 h-[10px] w-[10px] min-w-[10px] ${
							menuOpen ? "rotate-180" : ""
						}`}
						height={0}
						width={0}
						alt="small arrow"
					/>
				</div>
			</button>
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

export default HeroSearchTwoSelect;
