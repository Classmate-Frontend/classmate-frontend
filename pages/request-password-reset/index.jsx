import SignUpOrSignIn from "../../components/SignUpOrSignIn";
import ResetPasswordForm from "./ResetPasswordForm";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function signin() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated]);

	return (
		<SignUpOrSignIn
			heading="Reset Password"
			subheading="We’ll send you an email with a link to reset the password to your account."
			form={<ResetPasswordForm />}
			additional={
				<p className="font-classmate mt-4 text-classmate-green-6">
					Have an account?&nbsp;
					<Link href="/signin" className="text-classmate-green-1 underline">
						Sign In
					</Link>
				</p>
			}
		/>
	);
}
