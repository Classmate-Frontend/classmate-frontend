import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import useWindowSize from "../../hooks/useWindowSize";
import { useForm, FormProvider } from "react-hook-form";
import ClassmateButton from "../../components/ClassmateButton";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	removeAuthError,
	setAuthError,
	resetPassword,
	resetPasswordFailure,
} from "../../redux/auth/authActions";

export default function ResetPasswordForm() {
	const [resetPasswordSent, setResetPasswordSent] = useState(false);
	const [resetSuccessMessage, setResetSuccessMessage] = useState(
		"Password successfully reset!"
	);
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { width: windowWidth } = useWindowSize();
	const [errorMessage, setErrorMessage] = useState("");

	const token = router.query.token;
	const id = router.query.id;

	const methods = useForm({
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		},
	});
	const { handleSubmit, setError } = methods;

	function validatePassword(newPassword) {
		const oneUpper = "(?=.*?[A-Z])";
		const oneLower = "(?=.*?[a-z])";
		const oneDigit = "(?=.*?[0-9])";
		const oneSpecial = "(?=.*?[#?!@$%^&*-])";
		const minChar = ".{8,}";
		const maxChar = ".{8,64}";

		let errorMessage = "";
		if (!newPassword.match(minChar)) {
			errorMessage = "password must contain at least 8 characters";
		} else if (!newPassword.match(maxChar)) {
			errorMessage = "password must contain at most 64 characters";
		} else if (!newPassword.match(oneUpper)) {
			errorMessage = "password must contain one uppercase character";
		} else if (!newPassword.match(oneLower)) {
			errorMessage = "password must contain one lowercase character";
		} else if (!newPassword.match(oneDigit)) {
			errorMessage = "password must contain one digit";
		} else if (!newPassword.match(oneSpecial)) {
			errorMessage = "password must contain one special character";
		}

		if (errorMessage) {
			setError("newPassword");
			setError("confirmNewPassword");
			setErrorMessage(errorMessage);
			return true;
		}
		return false;
	}

	function validateConfirmPassword(newPassword, confirmNewPassword) {
		if (newPassword !== confirmNewPassword) {
			setError("newPassword");
			setError("confirmNewPassword");
			setErrorMessage("passwords do not match");
			return true;
		}
		return false;
	}

	function onSubmit({ newPassword, confirmNewPassword }) {
		const passwordError = validatePassword(newPassword);
		const confirmPasswordError = validateConfirmPassword(
			newPassword,
			confirmNewPassword
		);

		if (!passwordError && !confirmPasswordError) {
			setResetPasswordSent(true);
			dispatch(removeAuthError());
			dispatch(resetPassword({ newPassword, token, id }));
		} else {
			dispatch(setAuthError());
		}
	}

	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			dispatch(removeAuthError());
			dispatch(resetPasswordFailure(""));
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		return () => {
			dispatch(removeAuthError());
			dispatch(resetPasswordFailure(""));
		};
	}, []);

	useEffect(() => {
		if (auth.resetSuccess) {
			setTimeout(() => {
				router.push("/signin");
			}, 1500);
		} else if (auth.resetErrorMessage === "Session has expired.") {
			setTimeout(() => {
				router.push("/request-password-reset");
			}, 1500);
		}
	}, [auth]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full sm:mt-12">
			<div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
				<FormProvider {...methods}>
					<PasswordInput
						name="newPassword"
						label="New Password"
						background="bg-classmate-tan-2"
						rules={{
							required: true,
						}}
					/>
					<PasswordInput
						name="confirmNewPassword"
						label="Confirm New Password"
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
						{errorMessage}
					</span>
				</div>
			)}
			{resetPasswordSent && !auth.resetPasswordLoading && auth.resetSuccess && (
				<div className="mt-2 flex items-center gap-2">
					<Image
						src="/check-solid.svg"
						width={0}
						height={0}
						alt="exclamation mark"
						className="filter-classmate-green-3 h-[12px] w-[12px]"
					/>
					<span className="font-classmate text-sm text-classmate-green-3">
						{resetSuccessMessage}
					</span>
				</div>
			)}
			{resetPasswordSent &&
				!auth.resetPasswordLoading &&
				!auth.resetSuccess && (
					<div className="mt-2 flex items-center gap-2">
						<Image
							src="/circle-exclamation-solid.svg"
							width={0}
							height={0}
							alt="exclamation mark"
							className="filter-classmate-red-error h-[12px] w-[12px]"
						/>
						<span className="font-classmate text-sm text-classmate-error-red">
							{auth.resetErrorMessage}
						</span>
					</div>
				)}
			<ClassmateButton
				type="submit"
				variant="filled"
				fullWidth={true}
				loading={auth.resetPasswordLoading}
				size={windowWidth >= 640 ? "lg" : "sm"}
				styles="my-6 bg-classmate-gold-1 text-classmate-tan-2 sm:my-12">
				Reset Password
			</ClassmateButton>
		</form>
	);
}
