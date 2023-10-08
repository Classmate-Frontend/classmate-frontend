// @ts-nocheck
import React from "react";
import AccountMenu from "./AccountMenu";
import Image from "next/image";
import ClassmateButton from "./ClassmateButton";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	const { width } = useWindowSize();

	// Check if current path should have a light or dark navbar
	const pathname = router.asPath.split("/")[1];
	const onDashboardPage = pathname === "dashboard";

	return (
		<nav
			className={`z-10 flex w-full justify-end space-x-5 px-10 py-4 md:h-20 ${
				onDashboardPage ? "block bg-classmate-tan-2" : "absolute"
			}`}>
			{onDashboardPage && (
				<div className="flex items-center">
					<ClassmateButton
						styles="rounded-md p-2 text-2xl font-extrabold text-classmate-green-6 transition hover:!bg-classmate-hover-tan-2"
						href="/">
						{width >= 640 ? (
							<Image
								src="/classmate-logo-solid.svg"
								width={0}
								height={0}
								alt="large navbar classmate logo"
								className="filter-classmate-green-1 h-6 w-auto min-w-[143px]"
							/>
						) : (
							<Image
								src="/classmate-logo-small-solid.svg"
								width={0}
								height={0}
								alt="small navbar classmate logo"
								className="filter-classmate-green-1 h-6 w-auto"
							/>
						)}
					</ClassmateButton>
				</div>
			)}
			<AccountMenu />
		</nav>
	);
}
