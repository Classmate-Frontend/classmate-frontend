import { NextResponse } from "next/server";

const frontEndUrl =
	process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";

export default function middleware(req) {
	const {
		cookies,
		url,
		nextUrl: { search },
	} = req;

	const isAuthenticated = cookies.get("isAuthenticated")?.value === "true";
	const requestingAccountPage = url.includes("/dashboard");
	const requestingSignInOrSignUpPage =
		url.includes("/signin") || url.includes("/signup");

	const requestingResetPasswordPage = url.includes("/resetPass");

	if (requestingResetPasswordPage) {
		const urlSearchParams = new URLSearchParams(search);
		const { token, id, ts } = Object.fromEntries(urlSearchParams.entries());

		if ((!token || !id) && !ts) {
			return NextResponse.redirect(frontEndUrl + "/request-password-reset");
		}
	}

	// Will redirect user to account page if they attempt to go to the sign up or
	// sign in page when they are already signed in
	if (requestingSignInOrSignUpPage && isAuthenticated) {
		return NextResponse.redirect(frontEndUrl + "/dashboard");
	}

	// Will redirect user to signin page if they attempt to go to the private account
	// page with an invalid token
	if (requestingAccountPage && !isAuthenticated) {
		return NextResponse.redirect(frontEndUrl + "/signin");
	}

	return NextResponse.next();
}
