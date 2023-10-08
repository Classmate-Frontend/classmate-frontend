import React, { useEffect, useState } from "react";

const SignUpStepper = ({ baseIndex, children }) => {
	const offsets = [-1200, -600, 0, 600, 1200];
	const [showSlides, setShowSlides] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowSlides(true);
		}, 200);
	}, []);

	return (
		<>
			<div className="relative flex justify-center overflow-hidden bg-classmate-tan-1">
				<div
					style={{ transform: `translateX(${offsets[baseIndex]}px)` }}
					className={`transition-all ${
						baseIndex === 2 ? "" : "fade-out pointer-events-none"
					}`}>
					{children[0]}
				</div>
				<div
					style={{ transform: `translateX(${offsets[baseIndex + 1]}px)` }}
					className={`absolute top-0 transition-all ${
						baseIndex === 1 ? "fade-in" : "fade-out pointer-events-none"
					} ${showSlides ? "" : "!opacity-0"}`}>
					{children[1]}
				</div>
				<div
					style={{ transform: `translateX(${offsets[baseIndex + 2]}px)` }}
					className={`absolute top-0 transition-all ${
						baseIndex === 0 ? "fade-in" : "fade-out pointer-events-none"
					} ${showSlides ? "" : "!opacity-0"}`}>
					{children[2]}
				</div>
			</div>
		</>
	);
};

export default SignUpStepper;
