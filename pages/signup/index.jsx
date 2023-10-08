// @ts-nocheck
import React, { useEffect, useState } from "react";
import SignUpOrSignIn from "../../components/SignUpOrSignIn";
import SignUpForm from "./SignUpForm";
import SignUpStepper from "./SignUpStepper";
import SignUpPartTwoForm from "./SignUpPartTwoForm";
import SignUpPartThreeForm from "./SignUpPartThreeForm";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function SignUp() {
	const auth = useSelector((state) => state.auth);
	const userProfile = useSelector((state) => state.userProfile);
	const router = useRouter();

	const [baseIndex, setBaseIndex] = useState(2);

	const slideRight = () => {
		if (baseIndex <= 0) {
			return;
		}
		setBaseIndex((current) => current - 1);
	};

	const slideLeft = () => {
		if (baseIndex >= 1) {
			return;
		}
		if (auth.isAuthenticated && baseIndex >= 1) {
			return;
		}

		setBaseIndex((current) => current + 1);
	};

	useEffect(() => {
		const isAuthenticated = auth.isAuthenticated;
		const completedFirstStep =
			userProfile.userData?.hasOwnProperty("first_name") &&
			userProfile.userData?.hasOwnProperty("last_name") &&
			userProfile.userData?.hasOwnProperty("zipcode");

		const completedSecondStep =
			userProfile.userData?.hasOwnProperty("school") &&
			userProfile.userData?.hasOwnProperty("major") &&
			userProfile.userData?.hasOwnProperty("graduation_year");

		if (!isAuthenticated) {
			setBaseIndex(2);
		} else if (!completedFirstStep) {
			setBaseIndex(1);
		} else if (!completedSecondStep) {
			setBaseIndex(0);
		} else {
			router.push("/account");
		}
	}, [auth.isAuthenticated, auth.userData]);

	return (
		<SignUpStepper
			baseIndex={baseIndex}
			slideLeft={slideLeft}
			slideRight={slideRight}>
			<SignUpOrSignIn
				heading="Sign Up"
				subheading="Sign up to get access to insights and create your prefect semester."
				form={<SignUpForm />}
				variant="signup"
			/>
			<SignUpOrSignIn
				heading="Welcome!"
				subheading="Please share a little about yourself to help us tailor your experience."
				form={
					<SignUpPartTwoForm slideLeft={slideLeft} slideRight={slideRight} />
				}
				variant="signup"
			/>
			<SignUpOrSignIn
				heading="Almost Done!"
				subheading="Please share a little about yourself to help us tailor your experience."
				form={
					<SignUpPartThreeForm slideLeft={slideLeft} slideRight={slideRight} />
				}
				variant="signup"
			/>
		</SignUpStepper>
	);
}
