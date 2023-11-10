import React from "react";
import PasswordValidation from "./PasswordValidation";

const PasswordToolTip = ({
	showPasswordToolTip,
	hasEightChars,
	hasOneUppercaseLetter,
	hasOneLowercaseLetter,
	hasOneNumber,
}) => {
	return (
		<div
			style={{
				boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
			}}
			className={`font-classmate absolute top-[74px] z-10 flex w-full origin-top flex-col rounded-md bg-classmate-tan-2 p-5 opacity-0 transition ${
				showPasswordToolTip
					? "pointer-events-auto scale-100 opacity-100"
					: "pointer-events-none scale-75 opacity-0"
			}`}>
			<p className="mb-2 text-classmate-green-6">
				Password must contain the following:
			</p>
			<div className="flex flex-col gap-1">
				<PasswordValidation
					text={"At least 8 characters"}
					valid={hasEightChars}
				/>
				<PasswordValidation
					text={"At least one uppercase character"}
					valid={hasOneUppercaseLetter}
				/>
				<PasswordValidation
					text={"At least one lowercase character"}
					valid={hasOneLowercaseLetter}
				/>
				<PasswordValidation text={"At least one digit"} valid={hasOneNumber} />
			</div>
		</div>
	);
};

export default PasswordToolTip;
