// @ts-nocheck
import axios from "axios";
import {
	FORM_SEARCH_FAILURE,
	FORM_SEARCH_SUCCESS,
	FORM_SEARCH_LOADING,
	SET_FORM_SEARCH_TYPE,
	CLEAR_FORM_SEARCH,
	SET_FORM_SEARCH_FILTER,
	CLEAR_FORM_SEARCH_FILTERS,
	RESET_FORM_SEARCH,
	REMOVE_FORM_SEARCH_FILTER,
	RESET_FORM_SEARCH_FILTERS,
} from "./formSearchTypes";

// Reset to initial state
export const resetFormSearch = () => async (dispatch) => {
	// Flag search as loading
	dispatch({
		type: RESET_FORM_SEARCH,
	});
};

export const resetFormSearchFilters = () => async (dispatch) => {
	dispatch({
		type: RESET_FORM_SEARCH_FILTERS,
	});
};

// Search for school, professor, and course
export const search = (userInput) => async (dispatch, getState) => {
	// Flag search as loading
	dispatch(formSearchLoading());
	const { type: searchType } = getState().formSearch;
	const filters = {
		professor: null,
		department: null,
		school: null,
		score: null,
		difficulty: null,
		reviews: null,
		course: null,
	};

	try {
		// Attempt to search with credentials given
		const res = await attemptFormSearch(userInput, searchType, filters);
		// Search attempt succeeded
		dispatch(formSearchSuccess(res.data));
	} catch (err) {
		// Search attempt failed
		dispatch(formSearchFailure(err));
	}
};

export const setFormSearchType = (searchType) => (dispatch) => {
	dispatch({
		type: SET_FORM_SEARCH_TYPE,
		payload: searchType,
	});
};

// Clear search results
export const clearFormSearch = () => (dispatch) => {
	dispatch({
		type: CLEAR_FORM_SEARCH,
	});
};

// Clear search filters
export const clearFormSearchFilters = () => (dispatch) => {
	dispatch({
		type: CLEAR_FORM_SEARCH_FILTERS,
	});
};

// Set search filters to be applied on every search
export const setFormSearchFilter = (searchFilter) => (dispatch) => {
	dispatch({
		type: SET_FORM_SEARCH_FILTER,
		payload: searchFilter,
	});
};

export const removeFormSearchFilter = (searchFilter) => (dispatch) => {
	dispatch({
		type: REMOVE_FORM_SEARCH_FILTER,
		payload: searchFilter,
	});
};

export const setMultiFormSearchFilters =
	(searchFilters) => (dispatch, getState) => {
		const currentFilters = getState().mainSearch.filters;
		dispatch(setFormSearchFilter({ ...currentFilters, ...searchFilters }));
	};

// Attempt to search with credentials given
const attemptFormSearch = (userInput, searchType, filters) => {
	const data = {
		query: userInput,
		filters,
	};

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	return axios.post(`${searchType}/search`, data, config);
};

// Flag search as loading
const formSearchLoading = () => (dispatch) => {
	dispatch({
		type: FORM_SEARCH_LOADING,
	});
};

// Search attempt succeeded
const formSearchSuccess = (payload) => (dispatch) => {
	dispatch({
		type: FORM_SEARCH_SUCCESS,
		payload: payload,
	});
};

// Search attempt failed
const formSearchFailure = (err) => (dispatch) => {
	dispatch({
		type: FORM_SEARCH_FAILURE,
	});
};
