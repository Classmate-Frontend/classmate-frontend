// @ts-nocheck
import SignUpOrSignIn from "../../components/SignUpOrSignIn";
import ResetPassForm from "./ResetPassForm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ResetPass() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated]);

	return (
		<SignUpOrSignIn
			heading="New Password"
			subheading="Enter your new password"
			form={<ResetPassForm />}
		/>
	);
}
