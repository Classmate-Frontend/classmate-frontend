// @ts-nocheck
import { NextResponse } from "next/server";

const frontEndUrl =
	process.env.NODE_ENV === "production"
		? "https://www.theclassmate.org"
		: "http://localhost:3000";

export default function middleware(req) {
	const {
		cookies,
		url,
		nextUrl: { search },
	} = req;
	const resetUrl = req.nextUrl;

	const isAuthenticated = cookies.get("isAuthenticated")?.value === "true";
	const requestingAccountPage = url.includes("/dashboard");
	const requestingSignInOrSignUpPage =
		url.includes("/signin") || url.includes("/signup");
	const requestingResetPasswordPage = url.includes("/resetPass");

	// Private route for Classmate team only
	const requestingUserCountPage = url.includes("/view-number-registered");
	const userEmail = cookies.get("userEmail")?.value;
	const authorizedEmails = [
		"christian.bourdeau94@gmail.com",
		"alexis1895@gmail.com",
		"censoredgreen@gmail.com",
		"dcamarena0229@gmail.com",
	];
	const isAuthorizedForUserCount = authorizedEmails.includes(userEmail);
	if (requestingUserCountPage && !isAuthorizedForUserCount) {
		return NextResponse.redirect(frontEndUrl + "/signin");
	}

	if (requestingResetPasswordPage) {
		const urlSearchParams = new URLSearchParams(search);
		const { token, id } = Object.fromEntries(urlSearchParams.entries());

		const cookieToken = cookies.get("token")?.value;
		const cookieId = cookies.get("id");

		if (token && id) {
			resetUrl.searchParams.delete("token");
			resetUrl.searchParams.delete("id");

			const response = NextResponse.redirect(resetUrl);
			response.cookies.set("token", token);
			response.cookies.set("id", id);

			return response;
		} else if (!cookieToken || !cookieId) {
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
