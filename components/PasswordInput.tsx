// @ts-nocheck
import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

export default function PasswordInput({ name, label, rules, background }) {
	const [showPassword, setShowPassword] = useState(false);
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

	const handleClickShowPassword = () => setShowPassword((show) => !show);

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
							movePlaceHolder ? "-translate-y-[29px] text-sm" : ""
						}`}>
						<p
							className={`whitespace-nowrap ${
								changeLabelColor ? "text-classmate-gold-1" : ""
							} ${error ? "!text-classmate-error-red" : ""}`}>
							{label}
						</p>
					</span>
					<input
						autocomplete="chrome-off"
						autocomplete="off"
						type={showPassword ? "text" : "password"}
						onFocus={hanldeInputFocus}
						onBlur={() => hanldeInputBlur(value)}
						onChange={onChange}
						value={value}
						className={`font-classmate w-full rounded-md border-[1px] border-classmate-gray-2 bg-transparent px-4 py-4 text-classmate-green-7 placeholder-classmate-green-7 hover:border-classmate-gray-1  ${
							!!error
								? `!border-classmate-error-red !placeholder-classmate-error-red focus:!outline-classmate-error-red`
								: "focus:!outline-classmate-gold-1"
						}`}
					/>
					<button
						onClick={handleClickShowPassword}
						type="button"
						className="absolute right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-classmate-tan-2 transition-colors duration-300 ease-in-out hover:bg-classmate-gray-4">
						<Image
							height={0}
							width={0}
							className="filter-classmate-green-7 h-[20px] w-[20px]"
							src={
								showPassword ? "/eye-closed-solid.svg" : "/eye-open-solid.svg"
							}
							alt="Icon of an eye used to toggle password visibility."
						/>
					</button>
				</div>
			)}
		/>
	);
}
