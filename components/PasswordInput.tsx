// @ts-nocheck
import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import PasswordToolTip from "./PasswordToolTip";

export default function PasswordInput({
	name,
	label,
	rules,
	background,
	tooltip = true,
}) {
	const [showPassword, setShowPassword] = useState(false);
	const [movePlaceHolder, setMovePlaceHolder] = useState(false);
	const [changeLabelColor, setChangeLabelColor] = useState(false);
	const labelRef = useRef();
	const { control } = useFormContext();

	const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);

	const hanldeInputFocus = () => {
		setShowPasswordToolTip(true);
		setChangeLabelColor(true);
		if (!movePlaceHolder) {
			setMovePlaceHolder(true);
		}
	};

	const hanldeInputBlur = (userInput) => {
		setShowPasswordToolTip(false);
		setChangeLabelColor(false);
		if (!userInput) {
			setMovePlaceHolder(false);
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const [hasOneLowercaseLetter, setHasOneLowercaseLetter] = useState(false);
	const [hasOneUppercaseLetter, setHasOneUppercaseLetter] = useState(false);
	const [hasOneNumber, setHasOneNumber] = useState(false);
	const [hasEightChars, setHasEightChars] = useState(false);
	const validatePassword = (e) => {
		const newPassword = e.target.value;

		// Check if the password contains at least one lowercase letter
		const hasLowercaseLetter = /[a-z]/.test(newPassword);
		setHasOneLowercaseLetter(hasLowercaseLetter);

		// Check if the password contains at least one letter
		const hasUppercaseLetter = /[A-Z]/.test(newPassword);
		setHasOneUppercaseLetter(hasUppercaseLetter);

		// Check if the password contains at least one number
		const hasNumber = /[0-9]/.test(newPassword);
		setHasOneNumber(hasNumber);

		// Check if the password has at least eight characters
		const hasEightCharacters = newPassword.length >= 8;
		setHasEightChars(hasEightCharacters);
	};

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
						autocomplete="new-password"
						type={showPassword ? "text" : "password"}
						onFocus={hanldeInputFocus}
						onBlur={() => hanldeInputBlur(value)}
						onChange={(e) => {
							validatePassword(e);
							onChange(e);
						}}
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
						tabIndex={-1}
						className="absolute right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-classmate-tan-2 outline-none ring-classmate-gold-1 transition-colors duration-300 ease-in-out hover:bg-classmate-gray-4 focus:ring">
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
					{tooltip && (
						<PasswordToolTip
							showPasswordToolTip={showPasswordToolTip}
							hasOneLowercaseLetter={hasOneLowercaseLetter}
							hasOneUppercaseLetter={hasOneUppercaseLetter}
							hasOneNumber={hasOneNumber}
							hasEightChars={hasEightChars}
						/>
					)}
				</div>
			)}
		/>
	);
}
