import React from "react";
import Image from "next/image";

const PasswordValidation = ({ text, valid }) => {
	return (
		<div className="flex items-center">
			{valid ? (
				<span className="mr-2 rounded-full bg-classmate-green-2 p-[4px]">
					<Image
						src="/check-solid.svg"
						width={0}
						height={0}
						alt="exclamation mark"
						className="filter-classmate-tan-2 h-[7px] w-[7px]"
					/>
				</span>
			) : (
				<span className="mr-2 rounded-full bg-classmate-error-red p-[4px]">
					<Image
						src="/xmark-solid.svg"
						width={0}
						height={0}
						alt="exclamation mark"
						className="filter-classmate-tan-2 h-[7px] w-[7px]"
					/>
				</span>
			)}

			<p
				className={`text-sm ${
					valid ? "text-classmate-green-2" : "text-classmate-error-red"
				}`}>
				{text}
			</p>
		</div>
	);
};

export default PasswordValidation;
