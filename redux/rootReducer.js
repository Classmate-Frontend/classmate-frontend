// @ts-nocheck
import { combineReducers } from "redux";
import auth from "./auth/authReducers";
import userProfile from "./user-profile/userProfileReducers";
import formSearch from "./form-search/formSearchReducers";

export default combineReducers({
	auth,
	userProfile,
	formSearch,
});
