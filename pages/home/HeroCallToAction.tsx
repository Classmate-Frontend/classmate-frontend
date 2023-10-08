import React, { useState } from "react";
import ClassmateButton from "../../components/ClassmateButton";

const HeroCallToAction = (): JSX.Element | null => {
	return (
		<div className="relative flex h-[55px] w-full justify-center">
			<ClassmateButton
				size="sm"
				variant="filled"
				styles="bg-classmate-green-4 text-classmate-tan-1 !text-lg">
				Get Access
			</ClassmateButton>
		</div>
	);
};

export default HeroCallToAction;
