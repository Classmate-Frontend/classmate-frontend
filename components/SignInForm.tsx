// @ts-nocheck
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Spinner from "./Spinner";
import useWindowSize from "../hooks/useWindowSize";
import { useForm, FormProvider } from "react-hook-form";
import ClassmateButton from "./ClassmateButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	removeAuthError,
	setAuthError,
	signIn,
} from "../redux/auth/authActions";

import BasicInput from "./BasicInput";
import PasswordInput from "./PasswordInput";

export default function SignInForm() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { width: windowWidth } = useWindowSize();

	const methods = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const {
		handleSubmit,
		setError,
		setValue,
		getValues,
		formState: { errors },
	} = methods;

	function validateEmail(email) {
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return !email.match(emailRegex);
	}

	function validatePassword(password) {
		const passwordRegex = `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,64}$`;
		return !password.match(passwordRegex);
	}

	function setLoginError() {
		setError("email");
		setError("password", {
			type: "custom",
			message: "Your login or password is incorrect",
		});
	}

	function onSubmit({ email, password }) {
		email = email.toLowerCase();
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		if (!emailError && !passwordError) {
			dispatch(signIn({ email, password }));
		} else {
			dispatch(setAuthError());
		}
	}

	useEffect(() => {
		if (auth.error) {
			setLoginError();
		}
	}, [auth.error]);

	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			dispatch(removeAuthError());
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full sm:mt-12">
			<div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
				<FormProvider {...methods}>
					<BasicInput
						name="email"
						label="Email"
						background="bg-classmate-tan-2"
						rules={{
							required: true,
						}}
					/>
					<PasswordInput
						name="password"
						label="Password"
						background="bg-classmate-tan-2"
						tooltip={false}
						rules={{
							required: true,
						}}
					/>
				</FormProvider>
			</div>
			{auth.error && (
				<div className="mt-2 flex items-center gap-2">
					<Image
						src="/circle-exclamation-solid.svg"
						width={0}
						height={0}
						alt="exclamation mark"
						className="filter-classmate-red-error h-[12px] w-[12px]"
					/>
					<span className="font-classmate text-sm text-classmate-error-red">
						incorrect credentials
					</span>
				</div>
			)}
			<p className="font-classmate mt-4 text-classmate-green-6">
				<Link
					href="/request-password-reset"
					className="text-classmate-green-1 underline">
					Forgot Password?
				</Link>
			</p>
			<ClassmateButton
				type="submit"
				variant="filled"
				fullWidth={true}
				size={windowWidth >= 640 ? "lg" : "md"}
				styles="my-6 bg-classmate-gold-1 text-classmate-tan-2 sm:my-12">
				{auth.authLoading ? <Spinner /> : "Sign In"}
			</ClassmateButton>
		</form>
	);
}
