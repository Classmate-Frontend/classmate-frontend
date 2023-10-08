export function setTokenInLocalStorage(accessToken) {
	localStorage.setItem("accessToken", accessToken);
}

export function getTokenInLocalStorage() {
	return localStorage.getItem("accessToken");
}

export function removeTokenInLocalStorage() {
	return localStorage.removeItem("accessToken");
}
