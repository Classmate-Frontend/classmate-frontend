import React, { useRef, useEffect, useState } from "react";

const ToolTip = ({ children, spacing = 5, hideOn: hideToolTip }) => {
	// useRef to create a mutable ref for the toolTipChildren and toolTip element
	const toolTipChildren = useRef() as React.MutableRefObject<HTMLInputElement>;
	const toolTip = useRef() as React.MutableRefObject<HTMLInputElement>;

	// useState to manage the toolTipOffset and mouseOver state
	const [toolTipOffset, setToolTipOffset] = useState(0);
	const [mouseOver, setMouseOver] = useState(false);

	useEffect(() => {
		// Calculate the toolTipOffset based on the height of the toolTipChildren and toolTip elements
		const toolTipHeight = toolTip.current.offsetHeight;
		setToolTipOffset(
			(toolTipChildren.current.offsetHeight - toolTipHeight + spacing) * -1
		);
	}, []);

	const handleMouseOver = () => {
		// Set mouseOver state to true when the mouse is over the children
		setMouseOver(true);
	};

	const handleMouseOut = () => {
		// Set mouseOver state to false when the mouse is out of the children
		setMouseOver(false);
	};

	return (
		<span className="relative z-20 flex justify-center whitespace-nowrap rounded-full">
			<span
				ref={toolTip}
				style={{
					bottom: toolTipOffset,
					opacity: hideToolTip || !mouseOver ? 0 : 0.5,
					transform: hideToolTip || !mouseOver ? "scale(0.75)" : "scale(1)",
					transition: "all 200ms",
					transitionDelay: "100ms",
				}}
				className="font-classmate group-hover opacity-1 pointer-events-none absolute scale-100 rounded-md bg-black  px-2 py-1 text-xs tracking-wide text-white">
				Menu
			</span>
			<div
				ref={toolTipChildren}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className="rounded-full">
				{children}
			</div>
		</span>
	);
};

export default ToolTip;
