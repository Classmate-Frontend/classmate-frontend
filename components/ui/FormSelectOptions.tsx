// @ts-nocheck
import React from "react";

import Image from "next/image";

type InputProps = {
	icon?: string;
	text: string;
	selected?: boolean;
	selectName?: string;
	id?: string;
};

const FormSelectOptions = ({
	icon,
	text,
	selected,
	selectName,
	id,
}: InputProps) => {
	return (
		<button
			tabIndex={-1}
			data-selectname={selectName}
			data-value={text}
			data-id={id}
			className="font-classmate relative flex min-h-[40px] w-full items-center overflow-hidden rounded-md bg-classmate-gray-6 px-3 py-2 text-left leading-5 text-classmate-green-7 outline-none ring-classmate-gold-1 transition-all hover:bg-classmate-gray-6 focus:ring">
			{icon && (
				<Image
					width={19}
					height={19}
					src={icon}
					alt={""}
					className="filter-classmate-green-7 pointer-events-none mr-4"
				/>
			)}
			<span className="pointer-events-none !mr-auto">{text}</span>
			{selected && (
				<div className="flex h-full w-5 items-center justify-center bg-classmate-gray-6">
					<Image
						width={16}
						height={10}
						src="/check-solid.svg"
						className="filter-classmate-green-4"
						alt="check mark"
					/>
				</div>
			)}
		</button>
	);
};

export default FormSelectOptions;
