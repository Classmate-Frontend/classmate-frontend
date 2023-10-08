// @ts-nocheck
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormSelect from "../../components/ui/FormSelect";
import FormSelectOptions from "../../components/ui/FormSelectOptions";
import ClassmateButton from "../../components/ClassmateButton";
import Spinner from "../../components/Spinner";

import { useForm, FormProvider } from "react-hook-form";
import { updateUserProfile } from "../../redux/user-profile/userProfileActions";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import majors from "../../assests/data/majors";

export default function SignUpForm({ slideLeft, slideRight }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const userProfile = useSelector((state) => state.userProfile);
	const [errorMessage, setErrorMessage] = useState("");

	function generateYearArray() {
		const currentYear = new Date().getFullYear();
		const futureYear = currentYear + 10;
		const yearArray = [];

		for (let year = currentYear; year <= futureYear; year++) {
			yearArray.push(year);
		}

		return yearArray;
	}

	const [years, setYears] = useState(generateYearArray());

	const methods = useForm({
		defaultValues: {
			school: userProfile.userData?.school?.school_name || "",
			school_id: userProfile.userData?.school?.school_id || "",
			major: userProfile.userData?.major || "",
			graduationYear: userProfile.userData?.graduation_year || "",
		},
	});
	const {
		handleSubmit,
		formState: { errors },
	} = methods;

	const handleNextButtonClick = () => {
		handleSubmit(onSubmit);
	};

	function onSubmit({ school, school_id, major, graduationYear }) {
		dispatch(
			updateUserProfile({
				school: { school_name: school, school_id: school_id },
				major: major,
				graduation_year: graduationYear,
			})
		);
	}

	useEffect(() => {
		const completedSecondStep =
			userProfile.userData?.hasOwnProperty("school") &&
			userProfile.userData?.hasOwnProperty("major") &&
			userProfile.userData?.hasOwnProperty("graduation_year");
		if (completedSecondStep) {
			router.push("/dashboard");
		}
	}, [userProfile.userData]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full sm:mt-12">
			<div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
				<FormProvider {...methods}>
					<FormSelect
						name="school"
						size="lg"
						label="School *"
						type="database-search"
						backgroundColor="bg-classmate-tan-2"
						searchType="school"
						setValue={methods.setValue}
						getValues={methods.getValues}
						rules={{
							required: true,
						}}
					/>

					<FormSelect
						name="major"
						size="lg"
						label="Major *"
						type="local-search"
						backgroundColor="bg-classmate-tan-2"
						setValue={methods.setValue}
						getValues={methods.getValues}
						rules={{
							required: true,
						}}>
						{majors.map((major, index) => (
							<FormSelectOptions key={index} text={major} />
						))}
					</FormSelect>
					<FormSelect
						name="graduationYear"
						size="lg"
						label="Graduation Year *"
						type="local-search"
						backgroundColor="bg-classmate-tan-2"
						setValue={methods.setValue}
						getValues={methods.getValues}
						rules={{
							required: true,
						}}>
						{years.map((year, index) => (
							<FormSelectOptions key={index} text={year} />
						))}
					</FormSelect>
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
						callback={slideRight}
						type="submit"
						variant="filled"
						size="lg"
						fullWidth
						styles="bg-classmate-gold-1 text-classmate-tan-2 flex items-center gap-3 justify-center">
						{userProfile.userProfileUpdateLoading ? (
							<Spinner />
						) : (
							<>
								Finish
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
						className="h-4 w-4 cursor-pointer rounded-full bg-classmate-gray-4"
						onClick={slideLeft}
					/>
					<button
						type="submit"
						className="h-4 w-4 cursor-pointer rounded-full bg-classmate-gold-1"
						onClick={handleNextButtonClick}
					/>
				</div>
			</div>
		</form>
	);
}
