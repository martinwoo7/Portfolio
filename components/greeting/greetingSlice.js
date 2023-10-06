import { createSlice } from "@reduxjs/toolkit";
import { setWithExpiry } from "../../scripts/utils";

const initialState = {
	loggedIn: false,
};

export const greetingSlice = createSlice({
	name: "loggedIn",
	initialState,
	reducers: {
		login: (state) => {
			state.loggedIn = true;
		},
		logout: (state) => {
			state.loggedIn = false;
		},
	},
});

export const asyncLogin = () => (dispatch) => {
	// localStorage.setItem("loggedIn", true);
	setWithExpiry("loggedIn", true, 60)
	dispatch(login());
};

export const asyncLogout = () => (dispatch) => {
	localStorage.removeItem("loggedIn");
	dispatch(logout());
};

export const { login, logout } = greetingSlice.actions;
export default greetingSlice.reducer;
