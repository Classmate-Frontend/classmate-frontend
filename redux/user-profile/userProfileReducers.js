// @ts-nocheck
import {
	CLEAR_USER_PROFILE,
	PROFILE_RETRIEVED,
	BOOKMARKS_LOADING,
	BOOKMARKS_SUCCESS,
	BOOKMARKS_FAILURE,
	REVIEWS_LOADING,
	REVIEWS_SUCCESS,
	REVIEWS_FAILURE,
	UPDATE_USER_PROFILE_LOADING,
	UPDATE_USER_PROFILE_SUCCESS,
	UPDATE_USER_PROFILE_FAILURE,
} from "./userProfileTypes";

const initialState = {
	userData: null,
	bookmarks: null,
	bookmarksLoading: false,
	reviews: null,
	reviewsLoading: false,
	userProfileUpdateLoading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CLEAR_USER_PROFILE:
			return {
				...initialState,
			};
		case PROFILE_RETRIEVED:
			return {
				...state,
				userData: payload,
			};
		case REVIEWS_LOADING:
			return {
				...state,
				reviewsLoading: true,
			};
		case REVIEWS_SUCCESS:
			return {
				...state,
				reviews: payload,
				reviewsLoading: false,
			};
		case REVIEWS_FAILURE:
			return {
				...state,
				reviewsLoading: false,
			};
		case BOOKMARKS_LOADING:
			return {
				...state,
				bookmarksLoading: true,
			};
		case BOOKMARKS_SUCCESS:
			return {
				...state,
				bookmarks: payload,
				bookmarksLoading: false,
			};
		case BOOKMARKS_FAILURE:
			return {
				...state,
				bookmarksLoading: false,
			};
		case UPDATE_USER_PROFILE_LOADING:
			return {
				...state,
				userProfileUpdateLoading: true,
			};
		case UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfileUpdateLoading: false,
				userData: payload,
			};
		case UPDATE_USER_PROFILE_FAILURE:
			return {
				...state,
				userProfileUpdateLoading: false,
			};

		default:
			return state;
	}
};
