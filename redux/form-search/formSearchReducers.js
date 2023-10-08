// @ts-nocheck
import {
	FORM_SEARCH_SUCCESS,
	FORM_SEARCH_FAILURE,
	FORM_SEARCH_LOADING,
	SET_FORM_SEARCH_TYPE,
	CLEAR_FORM_SEARCH,
	SET_FORM_SEARCH_FILTER,
	CLEAR_FORM_SEARCH_FILTERS,
	RESET_FORM_SEARCH,
	REMOVE_FORM_SEARCH_FILTER,
	RESET_FORM_SEARCH_FILTERS,
} from "./formSearchTypes";

const initialStateCopy = {
	loading: false,
	results: [],
	type: "school",
	filters: {
		professor: {
			filter_value: null,
			filter_text: null,
		},
		department: {
			filter_value: null,
			filter_text: null,
		},
		school: {
			filter_value: null,
			filter_text: null,
		},
		score: {
			filter_value: null,
			filter_text: null,
		},
		difficulty: {
			filter_value: null,
			filter_text: null,
		},
		reviews: {
			filter_value: null,
			filter_text: null,
		},
		course: {
			filter_value: null,
			filter_text: null,
		},
	},
};

const initialState = {
	loading: false,
	results: [],
	type: "school",
	filters: {
		professor: {
			filter_value: null,
			filter_text: null,
		},
		department: {
			filter_value: null,
			filter_text: null,
		},
		school: {
			filter_value: null,
			filter_text: null,
		},
		score: {
			filter_value: null,
			filter_text: null,
		},
		difficulty: {
			filter_value: null,
			filter_text: null,
		},
		reviews: {
			filter_value: null,
			filter_text: null,
		},
		course: {
			filter_value: null,
			filter_text: null,
		},
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case RESET_FORM_SEARCH:
			return {
				...initialStateCopy,
				filters: { ...initialState.filters },
			};
		case RESET_FORM_SEARCH_FILTERS:
			return {
				...state,
				filters: {
					...initialStateCopy.filters,
				},
			};
		case FORM_SEARCH_LOADING:
			return {
				...state,
				loading: true,
			};
		case FORM_SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				results: payload,
			};
		case FORM_SEARCH_FAILURE:
			return {
				...state,
				loading: false,
				results: [],
			};
		case SET_FORM_SEARCH_TYPE:
			return {
				...state,
				type: payload,
			};
		case CLEAR_FORM_SEARCH:
			return {
				...state,
				results: [],
			};
		case SET_FORM_SEARCH_FILTER:
			return {
				...state,
				filters: {
					...payload,
				},
			};
		case REMOVE_FORM_SEARCH_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					[payload]: {
						filter_value: null,
						filter_text: null,
					},
				},
			};
		case CLEAR_FORM_SEARCH_FILTERS:
			return {
				...state,
				filters: initialStateCopy.filters,
			};
		default:
			return state;
	}
};
