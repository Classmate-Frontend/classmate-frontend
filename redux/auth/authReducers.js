// @ts-nocheck
import {
	AUTH_SUCCESS,
	AUTH_FAILURE,
	AUTH_LOADING,
	UN_AUTH_USER,
	SET_AUTH_ERROR,
	REMOVE_AUTH_ERROR,
	RESET_REQUEST_LOADING,
	RESET_REQUEST_SUCCESS,
	RESET_REQUEST_FAILURE,
	RESET_PASSWORD_LOADING,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	CLEAR_RESET_PASSWORD_SUCCESS,
	CLEAR_RESET_PASSWORD_FAILURE,
} from "./authTypes";

const initialState = {
	authLoading: false,
	isAuthenticated: false,
	accessToken: null,
	error: false,
	errorMessage: "",
	resetRequestLoading: false,
	resetPasswordLoading: false,
	resetSuccess: false,
	resetErrorMessage: "",
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_LOADING:
			return {
				...state,
				authLoading: true,
				isAuthenticated: false,
				accessToken: null,
			};
		case AUTH_SUCCESS:
			return {
				...state,
				authLoading: false,
				isAuthenticated: true,
				accessToken: payload.accessToken,
			};
		case AUTH_FAILURE:
			return {
				...state,
				authLoading: false,
				isAuthenticated: false,
				accessToken: null,
			};
		case UN_AUTH_USER:
			return {
				...state,
				isAuthenticated: false,
				accessToken: null,
			};
		case SET_AUTH_ERROR:
			return {
				...state,
				error: true,
				errorMessage: payload,
			};
		case REMOVE_AUTH_ERROR:
			return {
				...state,
				error: false,
				errorMessage: "",
			};
		case RESET_REQUEST_LOADING:
			return {
				...state,
				resetRequestLoading: true,
			};
		case RESET_REQUEST_SUCCESS:
		case RESET_REQUEST_FAILURE:
			return {
				...state,
				resetRequestLoading: false,
			};
		case RESET_PASSWORD_LOADING:
			return {
				...state,
				resetPasswordLoading: true,
			};

		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				resetPasswordLoading: false,
				resetSuccess: false,
				resetErrorMessage: payload,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordLoading: false,
				resetSuccess: true,
			};
		case CLEAR_RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetSuccess: false,
			};
		case CLEAR_RESET_PASSWORD_FAILURE:
			return {
				...state,
				resetSuccess: false,
				resetErrorMessage: "",
			};
		default:
			return state;
	}
};
