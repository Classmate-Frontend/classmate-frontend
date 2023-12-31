// @ts-nocheck
import { useEffect } from "react";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import { AuthState } from "../redux/auth/authInterface";

const CookieHandler = () => {
	// Retrieve the authentication state from the Redux store
	const auth = useSelector((state: { auth: AuthState }) => state.auth);
	const userEmail = useSelector((state) => state.userProfile.userData?.email);

	useEffect(() => {
		Cookie.set("isAuthenticated", auth.isAuthenticated.toString());
	}, [auth.isAuthenticated]);

	useEffect(() => {
		Cookie.set("accessToken", auth.accessToken);
	}, [auth.accessToken]);

	useEffect(() => {
		Cookie.set("userEmail", userEmail);
	}, [userEmail]);
};

export default CookieHandler;
