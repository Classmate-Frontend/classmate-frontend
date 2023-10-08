// @ts-nocheck
import React from "react";

// Next.js components
import Image from "next/image";

export interface MenuItem {
	icon: string;
	label: string;
	width: number;
	height: number;
	alt: string;
	id: string;
	href?: string;
}

interface DropMenuProps {
	menuItems: MenuItem[];
	callback: (
		e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
		href: string
	) => void;
	menuOpen: boolean;
	styles?: string;
	closeMenu: any;
}

const DropMenu: React.FC<DropMenuProps> = ({
	menuItems,
	callback,
	menuOpen,
	styles = "",
	closeMenu,
}) => {
	return (
		<>
			{menuOpen && (
				<div
					onClick={closeMenu}
					className="fixed left-0 top-0 z-30 h-screen w-screen "
				/>
			)}
			<ul
				className={`absolute right-0 z-40 mt-1 origin-top-right overflow-hidden rounded-lg bg-classmate-tan-2 drop-shadow-xl transition ${
					menuOpen
						? "pointer-events-auto scale-100 opacity-100"
						: "pointer-events-none scale-75 opacity-0"
				} ${styles}`}>
				{menuItems.map(
					({ icon, label, width, height, alt, id, href }: MenuItem) => (
						<li
							tabIndex={1}
							key={label}
							onClick={(e) => callback(e, href || "")}
							id={id}
							className="flex cursor-pointer whitespace-nowrap border-b-[1px] border-classmate-gray-5 px-5 py-4 transition delay-0 duration-75 hover:bg-classmate-gray-5">
							<div className="pointer-events-none mr-4 flex w-5 select-none items-center justify-center">
								<Image
									src={icon}
									width={width}
									height={height}
									alt={alt}
									style={{ height, width }}
									className="filter-classmate-green-7"
								/>
							</div>
							<p className="font-classmate pointer-events-none text-classmate-green-6">
								{label}
							</p>
						</li>
					)
				)}
			</ul>
		</>
	);
};

export default DropMenu;
