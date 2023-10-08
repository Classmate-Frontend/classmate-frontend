// @ts-nocheck
import React, { useEffect, useState } from "react";
import Image from "next/image";

import useWindowSize from "../../hooks/useWindowSize";
import { useForm, FormProvider } from "react-hook-form";
import ClassmateButton from "../../components/ClassmateButton";
import BasicInput from "../../components/BasicInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	removeAuthError,
	setAuthError,
	requestResetPassword,
} from "../../redux/auth/authActions";

export default function ResetPasswordForm() {
	const [resetRequestSent, setResetRequestSent] = useState(false);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { width: windowWidth } = useWindowSize();

	const methods = useForm({
		defaultValues: {
			email: "",
		},
	});
	const {
		handleSubmit,
		setError,
		formState: { errors },
	} = methods;

	function validateEmail(email) {
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return !email.match(emailRegex);
	}

	function setLoginError() {
		setError("email", {
			type: "custom",
			message: "Invalid email",
		});
	}

	function onSubmit({ email, password }) {
		const emailError = validateEmail(email);

		if (!emailError) {
			setResetRequestSent(true);
			dispatch(removeAuthError());
			dispatch(requestResetPassword(email));
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
			dispatch(removeAuthError());
			setResetRequestSent(false);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
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
						invalid email
					</span>
				</div>
			)}
			{resetRequestSent && !auth.resetRequestLoading && (
				<div className="mt-2 flex items-center gap-2">
					<Image
						src="/check-solid.svg"
						width={0}
						height={0}
						alt="exclamation mark"
						className="filter-classmate-green-3 h-[12px] w-[12px]"
					/>
					<span className="font-classmate text-sm text-classmate-green-3">
						Password reset link sent
					</span>
				</div>
			)}
			<ClassmateButton
				type="submit"
				variant="filled"
				fullWidth={true}
				loading={auth.resetRequestLoading}
				size={windowWidth >= 640 ? "lg" : "sm"}
				styles="my-6 bg-classmate-gold-1 text-classmate-tan-2 sm:my-12">
				Send Reset Link
			</ClassmateButton>
		</form>
	);
}
