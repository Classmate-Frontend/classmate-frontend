// @ts-nocheck
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Project components
import ToolTip from "./ToolTip";
import DropMenu, { MenuItem } from "./DropMenu";

// Next.js components
import { useRouter } from "next/router";

// Redux components
import { useAppDispatch } from "../hooks/reduxHooks";
import { useSelector } from "react-redux";
import { signOut } from "../redux/auth/authActions";

const AccountMenu = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [menuOpen, toggleMenuOpen] = useState(false);
	const [menuItems, setMenuItems] = useState<MenuItem[]>([,]);

	useEffect(() => {
		if (isAuthenticated) {
			setMenuItems([
				{
					icon: "/home-solid.svg",
					label: "Home",
					id: "home",
					width: 20,
					height: 20,
					href: "/",
					alt: "Home icon to go to the homepage",
				},
				{
					icon: "/document-check-solid.svg",
					label: "Dashboard",
					id: "dashboard",
					width: 20,
					height: 20,
					href: "/dashboard",
					alt: "dashboard",
				},
				{
					icon: "/signout-solid.svg",
					label: "Sign Out",
					id: "sign-out",
					width: 20,
					height: 20,
					href: "/signin",
					alt: "Sign out icon to sign out of your account",
				},
			]);
		} else {
			setMenuItems([
				{
					icon: "/home-solid.svg",
					label: "Home",
					id: "home",
					width: 20,
					height: 20,
					href: "/",
					alt: "Home icon to go to the homepage",
				},
				{
					icon: "/user-solid.svg",
					label: "Sign In",
					id: "sign-in",
					width: 20,
					height: 20,
					href: "/signin",
					alt: "Sign in icon to sign into your account",
				},
				{
					icon: "/signout-solid.svg",
					label: "Sign Up",
					id: "sign-up",
					width: 20,
					height: 20,
					href: "/signup",
					alt: "Sign up icon",
				},
			]);
		}
	}, [isAuthenticated]);

	const handleMenuClick = () => {
		toggleMenuOpen((current) => !current); // Toggle the menu open state
	};

	const handleMenuItemClick = (
		e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
		href: string
	) => {
		const { id } = e.target as HTMLLIElement; // Destructure the id property from e.target
		if (id === "sign-out") {
			dispatch(signOut()); // Dispatch sign out action if the "Sign Out" item is clicked
		}
		router.push(href); // Navigate to the specified href
		handleMenuClick(); // Close the menu
	};

	// Check if current path should have a light or dark navbar
	const pathname = router.asPath.split("/")[1];
	const pagesWithDarkNavbar = ["", "signin", "signup"];
	const bgColor = pagesWithDarkNavbar.includes(pathname)
		? "bg-classmate-tan-2"
		: "bg-classmate-tan-1";

	return (
		<div className="relative !ml-auto">
			{/* ToolTip component */}
			<ToolTip hideOn={menuOpen} spacing={10}>
				<button
					type="button"
					onClick={handleMenuClick}
					style={{ transition: "all 200ms", transitionDelay: "100ms" }}
					className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 outline-none ring-classmate-gold-1 transition delay-100 duration-200 hover:bg-classmate-tan-1 focus:ring">
					<div
						className={`font-classmate-bold text-classmate-green-1r flex h-10 w-10 select-none items-center justify-center rounded-full text-lg ${bgColor}`}>
						<Image
							src="hamburger-solid.svg"
							width={0}
							height={0}
							className="filter-classmate-green-1 h-4 w-4"
						/>
					</div>
				</button>
			</ToolTip>
			{/* DropMenu component */}
			<DropMenu
				menuItems={menuItems}
				callback={handleMenuItemClick}
				menuOpen={menuOpen}
				closeMenu={handleMenuClick}
			/>
		</div>
	);
};

export default AccountMenu;
