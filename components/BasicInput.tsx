import React, { FC, useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
	name: string;
	label: string;
	background: string;
	size?: "sm" | "lg";
	rules?: Record<string, unknown>;
	disabled?: boolean;
};

const BasicInput: FC<InputProps> = ({
	name,
	label,
	rules,
	background,
	size = "lg",
	disabled = false,
}) => {
	const [movePlaceHolder, setMovePlaceHolder] = useState(false);
	const [changeLabelColor, setChangeLabelColor] = useState(false);
	const labelRef = useRef();
	const { control } = useFormContext();

	const hanldeInputFocus = () => {
		setChangeLabelColor(true);
		if (!movePlaceHolder) {
			setMovePlaceHolder(true);
		}
	};

	const hanldeInputBlur = (userInput) => {
		setChangeLabelColor(false);
		if (!userInput) {
			setMovePlaceHolder(false);
		}
	};

	const labelTranslate =
		size === "lg" ? "-translate-y-[29px]" : "-translate-y-[25px]";

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<div className="relative flex w-full items-center">
					<span
						ref={labelRef}
						className={`font-classmate pointer-events-none absolute left-[18px] px-1 text-base text-classmate-green-7 transition-all duration-200 ${background} ${
							movePlaceHolder ? `${labelTranslate} text-sm` : ""
						}`}>
						<p
							className={`whitespace-nowrap ${
								changeLabelColor ? "text-classmate-gold-1" : ""
							} ${error ? "!text-classmate-error-red" : ""} ${
								disabled ? "text-classmate-gray-4" : ""
							}`}>
							{label}
						</p>
					</span>

					<input
						disabled={disabled}
						onFocus={hanldeInputFocus}
						onBlur={() => hanldeInputBlur(value)}
						onChange={onChange}
						value={value}
						className={`font-classmate w-full rounded-md border-[1px] border-classmate-gray-2 bg-transparent px-3 text-classmate-green-7 placeholder-classmate-green-7 hover:border-classmate-gray-1 ${
							size === "sm" ? "py-3" : "py-4"
						} ${
							!!error
								? `!border-classmate-error-red !placeholder-classmate-error-red focus:!outline-classmate-error-red`
								: "focus:!outline-classmate-gold-1"
						} ${disabled ? "pointer-events-none border-classmate-gray-4" : ""}`}
					/>
				</div>
			)}
		/>
	);
};

export default BasicInput;
