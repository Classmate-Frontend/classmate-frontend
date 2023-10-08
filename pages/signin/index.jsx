import SignUpOrSignIn from "../../components/SignUpOrSignIn";
import SignInForm from "../../components/SignInForm";
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
			heading="Welcome"
			subheading="Sign in to manage your courses and create the prefect semester"
			form={<SignInForm />}
			additional={
				<p className="font-classmate mt-4 text-classmate-green-6">
					Don't have an account?&nbsp;
					<Link href="/signup" className="text-classmate-green-1 underline">
						Sign Up
					</Link>
				</p>
			}
		/>
	);
}
