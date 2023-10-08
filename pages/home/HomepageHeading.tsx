import React, { ReactNode } from "react";

type HomepageHeadingProps = {
	children: ReactNode;
	headingStyles?: string;
	lineStyles?: string;
};

const HomepageHeading = ({
	children,
	headingStyles,
	lineStyles,
}: HomepageHeadingProps) => {
	return (
		<h1
			className={`font-classmate-bold relative flex justify-center text-center text-3xl text-classmate-green-1 sm:text-4xl xl:text-5xl ${headingStyles}`}>
			{children}
			<span
				className={`absolute top-12 h-[3px] w-10 rounded-sm bg-classmate-gray-4 sm:top-14 xl:top-16 ${lineStyles}`}
			/>
		</h1>
	);
};

export default HomepageHeading;
