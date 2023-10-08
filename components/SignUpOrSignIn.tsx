// @ts-nocheck
import React from "react";
import HomepageHeading from "../pages/home/HomepageHeading";

export default function SignUpOrSignIn({
	form,
	heading,
	subheading,
	additional,
}) {
	return (
		<div className="section-padding flex h-screen w-full items-center justify-center  bg-classmate-tan-1 py-14">
			<div className="flex h-fit w-full max-w-[380px] flex-col  items-center justify-center rounded-2xl bg-classmate-tan-2 px-10 py-12 shadow-xl sm:max-w-[480px] sm:p-[68px]">
				<HomepageHeading
					headingStyles="text-2xl xl:text-[40px]"
					lineStyles="xl:top-14">
					{heading}
				</HomepageHeading>
				<p className="font-classmate mt-6 max-w-[280px] text-center text-classmate-green-6 sm:mt-8 sm:max-w-[340px]">
					{subheading}
				</p>
				{form}
				<div className="flex w-full flex-col items-center gap-6 sm:gap-9">
					{additional}
				</div>
			</div>
		</div>
	);
}
