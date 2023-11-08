// @ts-nocheck
import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

export default function PasswordInput({ name, label, rules, background }) {
	const [showPassword, setShowPassword] = useState(false);
	const [movePlaceHolder, setMovePlaceHolder] = useState(false);
	const [changeLabelColor, setChangeLabelColor] = useState(false);
	const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);
	const labelRef = useRef();
	const { control } = useFormContext();

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
					{showPasswordToolTip && (
						<div
							style={{
								boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
							}}
							className="font-classmate absolute top-[74px] z-10 flex w-full flex-col rounded-md bg-classmate-tan-2 p-5">
							<p className="mb-2 text-classmate-green-6">
								Password must contain the following:
							</p>
							<div className="flex items-center">
								<span className="mr-2 rounded-full bg-classmate-error-red p-[4px]">
									<Image
										src="/xmark-solid.svg"
										width={0}
										height={0}
										alt="exclamation mark"
										className="filter-classmate-tan-2 h-[8px] w-[8px]"
									/>
								</span>
								<span className="mr-2 rounded-full bg-classmate-green-2 p-[4px]">
									<Image
										src="/check-solid.svg"
										width={0}
										height={0}
										alt="exclamation mark"
										className="filter-classmate-tan-2 h-[8px] w-[8px]"
									/>
								</span>

								<p className="text-classmate-error-red">
									At least one uppercase letter
								</p>
							</div>
						</div>
					)}
				</div>
			)}
		/>
	);
}
