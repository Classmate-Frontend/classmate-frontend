import React, { FC, ReactNode } from "react";
import Spinner from "./Spinner";

// Next.js components
import Link from "next/link";

type ClassmateButtonProps = {
	variant: "filled" | "outlined" | "text" | "link";
	fullWidth?: boolean;
	href?: string;
	children: ReactNode;
	styles?: string;
	size: "xs" | "sm" | "md" | "lg";
	callback?: () => void;
	loading?: boolean;
	type?: "button" | "submit" | "reset";
};

const variantStylesMap = {
	filled: "hover:brightness-105",
	outlined: "border-[1px] hover:brightness-95",
	text: "rounded-md",
};

const sizeStylesMap = {
	xs: "text-xs px-2 py-1 rounded-md font-classmate ",
	sm: "text-sm px-6 py-2 rounded-md font-classmate-bold",
	md: "text-sm px-8 py-3 rounded-lg font-classmate-bold",
	lg: "text-base px-10 py-3 rounded-lg font-classmate-bold",
};

const baseStyles =
	"whitespace-nowrap !transition !duration-800 ease-in-out duration-200 outline-none ring-classmate-gold-1 focus:ring w-fit flex justify-center";

const ClassmateButton: FC<ClassmateButtonProps> = ({
	type = "button",
	loading = false,
	fullWidth = false,
	href,
	variant,
	size,
	styles,
	callback,

	children,
}) => {
	const variantStyles = variantStylesMap[variant] || "";
	const sizeStyles = sizeStylesMap[size] || "";

	return href ? (
		<Link
			href={href}
			type={type}
			onClick={callback}
			className={`${baseStyles} ${variantStyles} ${sizeStyles} ${styles} ${
				fullWidth ? "w-full" : ""
			}`}>
			{children}
		</Link>
	) : (
		<button
			id="classmate-button"
			type={type}
			onClick={callback}
			className={`${baseStyles} ${variantStyles} ${sizeStyles} ${styles} ${
				fullWidth ? "w-full" : ""
			}`}>
			{loading ? <Spinner /> : children}
		</button>
	);
};

export default ClassmateButton;
