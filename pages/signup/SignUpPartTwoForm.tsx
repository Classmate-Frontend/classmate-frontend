import React, { useState, useEffect } from "react";
import Image from "next/image";

import Spinner from "../../components/Spinner";
import { useForm, FormProvider } from "react-hook-form";
import ClassmateButton from "../../components/ClassmateButton";
import { updateUserProfile } from "../../redux/user-profile/userProfileActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import BasicInput from "../../components/BasicInput";

export default function SignUpForm({ slideLeft, slideRight }) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const userProfile = useSelector((state) => state.userProfile);
	const [errorMessage, setErrorMessage] = useState("");

	const methods = useForm({
		defaultValues: {
			firstName: userProfile.userData?.first_name,
			lastName: userProfile.userData?.last_name,
			zipcode: userProfile.userData?.zipcode,
		},
	});
	const {
		handleSubmit,
		formState: { errors },
	} = methods;

	function onSubmit({ firstName, lastName, zipcode }) {
		if (!userProfile.useProfileUpdateLoading) {
			dispatch(
				updateUserProfile({
					first_name: firstName,
					last_name: lastName,
					zipcode,
				})
			);
		}
	}

	useEffect(() => {
		const completedFirstStep =
			userProfile.userData?.hasOwnProperty("first_name") &&
			userProfile.userData?.hasOwnProperty("last_name") &&
			userProfile.userData?.hasOwnProperty("zipcode");
		if (completedFirstStep) {
			slideRight();
		}
	}, [userProfile.userData]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full sm:mt-12">
			<div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
				<FormProvider {...methods}>
					<BasicInput
						name="firstName"
						label="First Name*"
						background="bg-classmate-tan-2"
						rules={{
							required: true,
						}}
					/>
					<BasicInput
						name="lastName"
						label="Last Name*"
						background="bg-classmate-tan-2"
						rules={{
							required: true,
						}}
					/>
					<BasicInput
						name="zipcode"
						label="Zipcode*"
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
			<div className="flex flex-col gap-10">
				<div className="mt-10 flex justify-center gap-2">
					<ClassmateButton
						callback={slideLeft}
						variant="filled"
						size="lg"
						fullWidth
						styles="bg-classmate-gold-1 text-classmate-tan-2 flex items-center gap-3 justify-center">
						{userProfile.userProfileUpdateLoading ? (
							<Spinner />
						) : (
							<>
								<Image
									src={"/caret-solid.svg"}
									width={0}
									height={0}
									alt="small arrow"
									className="filter-classmate-tan-1 h-3 w-3 rotate-90"
								/>
								Back
							</>
						)}
					</ClassmateButton>
					<ClassmateButton
						type="submit"
						variant="filled"
						size="lg"
						fullWidth
						styles="bg-classmate-gold-1 text-classmate-tan-2 flex items-center gap-3 justify-center">
						{userProfile.userProfileUpdateLoading ? (
							<Spinner />
						) : (
							<>
								Next
								<Image
									src={"/caret-solid.svg"}
									width={0}
									height={0}
									alt="small arrow"
									className="filter-classmate-tan-1 h-3 w-3 -rotate-90"
								/>
							</>
						)}
					</ClassmateButton>
				</div>
				<div className="flex items-center justify-center gap-5">
					<button
						type="button"
						className="h-4 w-4 cursor-pointer rounded-full bg-classmate-gold-1"
						onClick={slideLeft}
					/>
					<button
						type="submit"
						className="h-4 w-4 cursor-pointer rounded-full bg-classmate-gray-4"
					/>
				</div>
			</div>
		</form>
	);
}
